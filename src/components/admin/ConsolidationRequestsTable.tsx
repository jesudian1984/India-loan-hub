import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { Eye } from 'lucide-react';

interface LoanRow {
  financier?: string;
  loan_amount?: number;
  emi?: number;
  tenor?: number;
  outstanding?: number;
}

interface ConsolidationRequest {
  id: string;
  full_name: string;
  phone: string;
  email: string | null;
  city: string | null;
  existing_loans: LoanRow[] | any;
  total_outstanding: number | null;
  total_emi: number | null;
  consent_given: boolean;
  status: string | null;
  source: string | null;
  created_at: string;
}

const fmtINR = (n?: number | null) =>
  typeof n === 'number' ? `₹${n.toLocaleString('en-IN')}` : '-';

const ConsolidationRequestsTable = () => {
  const [rows, setRows] = useState<ConsolidationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ConsolidationRequest | null>(null);

  const fetchRows = async () => {
    try {
      const { data, error } = await supabase
        .from('consolidation_requests')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setRows((data as any) || []);
    } catch (e: any) {
      toast.error('Failed to fetch consolidation requests: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRows();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('consolidation_requests')
        .update({ status: newStatus })
        .eq('id', id);
      if (error) throw error;
      setRows(rows.map(r => (r.id === id ? { ...r, status: newStatus } : r)));
      toast.success('Status updated');
    } catch (e: any) {
      toast.error('Failed to update status: ' + e.message);
    }
  };

  const statusColor = (s: string) => {
    switch (s) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'qualified': return 'bg-green-100 text-green-800';
      case 'converted': return 'bg-purple-100 text-purple-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) return <div className="py-4">Loading consolidation requests...</div>;
  if (rows.length === 0) return <div className="py-4 text-muted-foreground">No consolidation requests yet.</div>;

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>City</TableHead>
            <TableHead>Loans</TableHead>
            <TableHead>Total Outstanding</TableHead>
            <TableHead>Total EMI</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map(r => {
            const loans: LoanRow[] = Array.isArray(r.existing_loans) ? r.existing_loans : [];
            return (
              <TableRow key={r.id}>
                <TableCell className="font-medium">{r.full_name}</TableCell>
                <TableCell>{r.phone}</TableCell>
                <TableCell>{r.city || '-'}</TableCell>
                <TableCell>{loans.length}</TableCell>
                <TableCell>{fmtINR(r.total_outstanding)}</TableCell>
                <TableCell>{fmtINR(r.total_emi)}</TableCell>
                <TableCell>
                  <Select value={r.status || 'new'} onValueChange={v => updateStatus(r.id, v)}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue>
                        <Badge className={statusColor(r.status || 'new')}>{r.status || 'new'}</Badge>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="qualified">Qualified</SelectItem>
                      <SelectItem value="converted">Converted</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>{format(new Date(r.created_at), 'dd MMM yyyy')}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm" onClick={() => setSelected(r)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Consolidation Request</DialogTitle>
                      </DialogHeader>
                      {selected && (
                        <div className="space-y-4 text-sm">
                          <div className="grid grid-cols-2 gap-3">
                            <div><span className="text-muted-foreground">Name:</span> {selected.full_name}</div>
                            <div><span className="text-muted-foreground">Phone:</span> {selected.phone}</div>
                            <div><span className="text-muted-foreground">Email:</span> {selected.email || '-'}</div>
                            <div><span className="text-muted-foreground">City:</span> {selected.city || '-'}</div>
                            <div><span className="text-muted-foreground">Source:</span> {selected.source || '-'}</div>
                            <div><span className="text-muted-foreground">Consent:</span> {selected.consent_given ? 'Yes' : 'No'}</div>
                          </div>
                          <div>
                            <div className="font-medium mb-2">Existing Loans</div>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Financier</TableHead>
                                  <TableHead>Loan Amt</TableHead>
                                  <TableHead>EMI</TableHead>
                                  <TableHead>Tenor</TableHead>
                                  <TableHead>Outstanding</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {(Array.isArray(selected.existing_loans) ? selected.existing_loans : []).map((l: LoanRow, i: number) => (
                                  <TableRow key={i}>
                                    <TableCell>{l.financier || '-'}</TableCell>
                                    <TableCell>{fmtINR(l.loan_amount)}</TableCell>
                                    <TableCell>{fmtINR(l.emi)}</TableCell>
                                    <TableCell>{l.tenor ?? '-'}</TableCell>
                                    <TableCell>{fmtINR(l.outstanding)}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                          <div className="grid grid-cols-2 gap-3 pt-2 border-t">
                            <div><span className="text-muted-foreground">Total Outstanding:</span> {fmtINR(selected.total_outstanding)}</div>
                            <div><span className="text-muted-foreground">Total EMI:</span> {fmtINR(selected.total_emi)}</div>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ConsolidationRequestsTable;

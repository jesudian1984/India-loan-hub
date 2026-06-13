import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ExcelUploader from '@/components/ExcelUploader';
import LeadsTable from '@/components/admin/LeadsTable';
import LoanApplicationsTable from '@/components/admin/LoanApplicationsTable';
import ConsolidationRequestsTable from '@/components/admin/ConsolidationRequestsTable';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Users, FileText, Upload, Layers } from 'lucide-react';

const Admin = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [checkingAdmin, setCheckingAdmin] = React.useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        toast.error("Please login to access admin panel");
        navigate('/auth');
        return;
      }

      try {
        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .eq('role', 'admin')
          .maybeSingle();

        if (error) throw error;

        if (!data) {
          toast.error("Access denied. Admin privileges required.");
          navigate('/');
          return;
        }

        setIsAdmin(true);
      } catch (error: any) {
        toast.error("Failed to verify admin status");
        navigate('/');
      } finally {
        setCheckingAdmin(false);
      }
    };

    if (!loading) {
      checkAdminStatus();
    }
  }, [user, loading, navigate]);

  if (loading || checkingAdmin) {
    return <div className="container mx-auto py-10 px-4">Loading...</div>;
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <Tabs defaultValue="leads" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 max-w-2xl">
          <TabsTrigger value="leads" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Leads
          </TabsTrigger>
          <TabsTrigger value="applications" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Applications
          </TabsTrigger>
          <TabsTrigger value="consolidation" className="flex items-center gap-2">
            <Layers className="h-4 w-4" />
            Consolidation
          </TabsTrigger>
          <TabsTrigger value="import" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Import
          </TabsTrigger>
        </TabsList>

        <TabsContent value="leads">
          <Card>
            <CardHeader>
              <CardTitle>Leads Management</CardTitle>
              <CardDescription>
                View and manage leads from eligibility checks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LeadsTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="applications">
          <Card>
            <CardHeader>
              <CardTitle>Loan Applications</CardTitle>
              <CardDescription>
                View and manage all loan applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LoanApplicationsTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="consolidation">
          <Card>
            <CardHeader>
              <CardTitle>Loan Consolidation Requests</CardTitle>
              <CardDescription>
                Leads from the consolidation estimator with their existing loan details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ConsolidationRequestsTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="import">
          <Card>
            <CardHeader>
              <CardTitle>Company Data Management</CardTitle>
              <CardDescription>
                Upload and manage company data for loan eligibility assessment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Import Company Data</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Upload an Excel file with company data to add to the system. The file should have
                    columns for "Company Name" and "Category" (A, B, C, or D).
                  </p>
                  <ExcelUploader 
                    onSuccess={(count) => {
                      console.log(`Successfully added ${count} companies`);
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;

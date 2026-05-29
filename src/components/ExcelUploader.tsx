import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { processExcelFile } from '@/utils/excelParser';
import { toast } from '@/components/ui/sonner';
import { Upload, FileArchive } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export interface ExcelUploaderProps {
  onSuccess?: (addedCount: number) => void;
}

const ExcelUploader: React.FC<ExcelUploaderProps> = ({ onSuccess }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [open, setOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      // Check if file is an Excel file
      if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
          file.type === 'application/vnd.ms-excel' ||
          file.name.endsWith('.xlsx') || 
          file.name.endsWith('.xls')) {
        setSelectedFile(file);
      } else {
        toast.error('Please select a valid Excel file (.xlsx or .xls)');
        e.target.value = '';
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select an Excel file first');
      return;
    }

    setIsUploading(true);
    
    try {
      const addedCount = await processExcelFile(selectedFile);
      
      toast.success(
        addedCount > 0
          ? `Successfully added ${addedCount} new companies to the database`
          : 'File processed, but no new companies were added'
      );
      
      if (onSuccess) {
        onSuccess(addedCount);
      }
      
      setSelectedFile(null);
      setOpen(false);
      
      // Refresh to home to reflect latest companies
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
      
      // Clear the input
      const fileInput = document.getElementById('excel-file') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
    } catch (error) {
      console.error('Error uploading Excel file:', error);
      toast.error('Failed to process the Excel file. Please check the format and try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <FileArchive className="h-4 w-4" />
          Import Company Data
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Import Company Data</DialogTitle>
          <DialogDescription>
            Upload an Excel file containing company data to add to the system.
            The file should have columns named "Company Name" and "Category".
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="excel-file" className="col-span-4">
              Excel File
            </Label>
            <div className="col-span-4">
              <Input
                id="excel-file"
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileChange}
                disabled={isUploading}
              />
            </div>
          </div>
          
          {selectedFile && (
            <div className="text-sm text-muted-foreground">
              Selected file: {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button onClick={handleUpload} disabled={!selectedFile || isUploading}>
            {isUploading ? (
              <>
                <Upload className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExcelUploader;

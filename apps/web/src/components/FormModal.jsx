
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

const FormModal = ({ open, onOpenChange, title, children, fullFormLink }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">{title}</DialogTitle>
          {fullFormLink && (
            <Link 
              to={fullFormLink} 
              className="text-sm text-primary hover:underline flex items-center gap-1 mt-2"
              onClick={() => onOpenChange(false)}
            >
              Open full form page
              <ExternalLink className="w-3 h-3" />
            </Link>
          )}
        </DialogHeader>
        <div className="mt-4">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FormModal;

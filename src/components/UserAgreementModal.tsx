import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface UserAgreementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserAgreementModal = ({ isOpen, onClose }: UserAgreementModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
            User Agreement
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">
              1. Acceptance of Terms
            </h3>
            <p>
              By accessing and using Citable ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">
              2. Use License
            </h3>
            <p>
              Permission is granted to temporarily use Citable for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to reverse engineer any software contained in the Service</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">
              3. User Content
            </h3>
            <p>
              You retain ownership of any intellectual property rights that you hold in content that you submit to the Service. By submitting content, you grant Citable a worldwide license to use, host, store, reproduce, modify, create derivative works, communicate, publish, publicly perform, publicly display and distribute such content.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">
              4. Privacy and Data Protection
            </h3>
            <p>
              Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices regarding the collection and use of your personal information.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">
              5. Service Availability
            </h3>
            <p>
              We strive to maintain the availability of the Service, but we do not guarantee that the Service will be available at all times. We may suspend or discontinue the Service at any time without notice.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">
              6. Limitation of Liability
            </h3>
            <p>
              In no event shall Citable or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the Service.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">
              7. Changes to Terms
            </h3>
            <p>
              We reserve the right to modify these terms at any time. We will notify users of any material changes by posting the new terms on this page and updating the "Last Updated" date.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Last Updated: January 2025
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserAgreementModal; 
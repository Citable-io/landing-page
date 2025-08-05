import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { addToWaitingList, checkEmailExists } from "@/lib/firestore";

interface WaitingListFormData {
  firstname: string;
  lastname: string;
  email: string;
  affiliation: string;
}

interface FormErrors {
  firstname?: string;
  lastname?: string;
  email?: string;
  affiliation?: string;
  general?: string;
}

const WaitingListForm = ({ trigger }: { trigger: React.ReactNode }) => {
  const [formData, setFormData] = useState<WaitingListFormData>({
    firstname: "",
    lastname: "",
    email: "",
    affiliation: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'firstname':
        if (!value.trim()) return 'First name is required';
        if (value.trim().length < 2) return 'First name must be at least 2 characters';
        return undefined;
      case 'lastname':
        if (!value.trim()) return 'Last name is required';
        if (value.trim().length < 2) return 'Last name must be at least 2 characters';
        return undefined;
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        return undefined;
      case 'affiliation':
        if (!value.trim()) return 'Affiliation is required';
        if (value.trim().length < 3) return 'Affiliation must be at least 3 characters';
        return undefined;
      default:
        return undefined;
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Validate all fields
    Object.keys(formData).forEach((key) => {
      const fieldName = key as keyof WaitingListFormData;
      const error = validateField(fieldName, formData[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    
    try {
      console.log('Starting email existence check for:', formData.email);
      // Check if email already exists
      const emailExists = await checkEmailExists(formData.email);
      console.log('Email existence check result:', emailExists);
      
      if (emailExists) {
        console.log('Email already exists, showing error');
        setErrors({
          email: 'This email is already registered on our waiting list.'
        });
        setIsSubmitting(false);
        return;
      }
      
      console.log('Email is new, proceeding with submission');
      // Add to waiting list
      await addToWaitingList({
        firstname: formData.firstname.trim(),
        lastname: formData.lastname.trim(),
        email: formData.email.trim().toLowerCase(),
        affiliation: formData.affiliation.trim(),
      });
      
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after a delay
      setTimeout(() => {
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          affiliation: "",
        });
        setErrors({});
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error('Form submission error:', error);
      setIsSubmitting(false);
      setErrors({
        general: error instanceof Error ? error.message : "Failed to join waiting list. Please try again."
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-center">
            Join the Waiting List
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Be among the first to experience the AI-powered research environment
          </DialogDescription>
        </DialogHeader>
        
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {errors.general && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                {errors.general}
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstname">First Name *</Label>
                <Input
                  id="firstname"
                  name="firstname"
                  type="text"
                  value={formData.firstname}
                  onChange={handleInputChange}
                  placeholder="Enter your first name"
                  className={errors.firstname ? "border-red-500 focus:border-red-500" : ""}
                />
                {errors.firstname && (
                  <p className="text-sm text-red-600">{errors.firstname}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastname">Last Name *</Label>
                <Input
                  id="lastname"
                  name="lastname"
                  type="text"
                  value={formData.lastname}
                  onChange={handleInputChange}
                  placeholder="Enter your last name"
                  className={errors.lastname ? "border-red-500 focus:border-red-500" : ""}
                />
                {errors.lastname && (
                  <p className="text-sm text-red-600">{errors.lastname}</p>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email address"
                className={errors.email ? "border-red-500 focus:border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="affiliation">Affiliation *</Label>
              <Input
                id="affiliation"
                name="affiliation"
                type="text"
                value={formData.affiliation}
                onChange={handleInputChange}
                placeholder="Company, University, or Organization"
                className={errors.affiliation ? "border-red-500 focus:border-red-500" : ""}
              />
              {errors.affiliation && (
                <p className="text-sm text-red-600">{errors.affiliation}</p>
              )}
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Joining..." : "Join The Waiting List"}
            </Button>
          </form>
        ) : (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Thank you!</h3>
              <p className="text-muted-foreground">
                You've been added to our waiting list. We'll notify you when Citable is ready.
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default WaitingListForm; 
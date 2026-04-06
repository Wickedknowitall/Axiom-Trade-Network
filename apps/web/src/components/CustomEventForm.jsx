
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import pb from '@/lib/pocketbaseClient';

const formSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  companyName: z.string().min(2, 'Company name is required'),
  email: z.string().email('Valid email is required'),
  phoneNumber: z.string().min(5, 'Phone number is required'),
  industry: z.string().optional(),
  eventType: z.string().optional(),
  targetAudience: z.string().optional(),
  expectedParticipants: z.number().optional(),
  preferredLocation: z.string().optional(),
  estimatedBudgetRange: z.string().optional(),
  eventTimeline: z.string().optional(),
  objectives: z.string().optional(),
  additionalNotes: z.string().optional(),
});

const CustomEventForm = ({ onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      companyName: '',
      email: '',
      phoneNumber: '',
      industry: '',
      eventType: '',
      targetAudience: '',
      expectedParticipants: 50,
      preferredLocation: '',
      estimatedBudgetRange: '',
      eventTimeline: '',
      objectives: '',
      additionalNotes: '',
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await pb.collection('custom_events').create(data, { $autoCancel: false });
      toast.success('Custom event request received. Our team will contact you to discuss details.');
      form.reset();
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input placeholder="Lucia Torres" {...field} className="text-gray-900 placeholder:text-gray-400" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company name</FormLabel>
                <FormControl>
                  <Input placeholder="Coastal Enterprises" {...field} className="text-gray-900 placeholder:text-gray-400" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="lucia@coastal.com" {...field} className="text-gray-900 placeholder:text-gray-400" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <Input placeholder="+34 91 123 4567" {...field} className="text-gray-900 placeholder:text-gray-400" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Industry</FormLabel>
                <FormControl>
                  <Input placeholder="Manufacturing" {...field} className="text-gray-900 placeholder:text-gray-400" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="eventType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event type</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="text-gray-900">
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="conference">Conference</SelectItem>
                    <SelectItem value="trade-fair">Trade fair</SelectItem>
                    <SelectItem value="networking">Networking event</SelectItem>
                    <SelectItem value="trade-mission">Trade mission</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="targetAudience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target audience</FormLabel>
              <FormControl>
                <Input placeholder="C-level executives, business owners, investors" {...field} className="text-gray-900 placeholder:text-gray-400" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="expectedParticipants"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expected number of participants</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="1"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 50)}
                    className="text-gray-900"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="preferredLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred location</FormLabel>
                <FormControl>
                  <Input placeholder="Lagos, Nigeria" {...field} className="text-gray-900 placeholder:text-gray-400" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="estimatedBudgetRange"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estimated budget range</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="text-gray-900">
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="under-50k">Under $50,000</SelectItem>
                    <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                    <SelectItem value="100k-250k">$100,000 - $250,000</SelectItem>
                    <SelectItem value="250k-500k">$250,000 - $500,000</SelectItem>
                    <SelectItem value="over-500k">Over $500,000</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="eventTimeline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event timeline</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="text-gray-900">
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1-3-months">1-3 months</SelectItem>
                    <SelectItem value="3-6-months">3-6 months</SelectItem>
                    <SelectItem value="6-12-months">6-12 months</SelectItem>
                    <SelectItem value="12-plus-months">12+ months</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="objectives"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event objectives</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="What are your main goals for this event? (e.g., generate leads, build partnerships, launch product)" 
                  className="min-h-[100px] text-gray-900 placeholder:text-gray-400" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="additionalNotes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional notes</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Any other details or requirements..." 
                  className="min-h-[100px] text-gray-900 placeholder:text-gray-400" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 active:scale-[0.98]"
        >
          {isSubmitting ? 'Submitting...' : 'Submit custom event request'}
        </Button>
      </form>
    </Form>
  );
};

export default CustomEventForm;

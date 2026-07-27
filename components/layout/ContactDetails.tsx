import { ContactForm } from '@/components/layout/ContactForm';
import { PhoneLink } from '@/components/layout/PhoneLink';

export function ContactDetails() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <PhoneLink />
      <ContactForm />
    </div>
  );
}

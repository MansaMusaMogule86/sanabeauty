import React, { useState } from 'react';
import { Sparkles, Mail, Clock, MapPin, CheckCircle } from 'lucide-react';
import { SocialLinks } from '@/src/components/ui/SocialLinks.tsx';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Order & Ritual Consultation');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
  };

  return (
    <main className="py-16 sm:py-24 bg-[#FAF6F0] text-[#2D1B1A]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase text-[#6B2C3E] font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A961]" />
            <span>Customer Experience</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#2D1B1A]">
            CONCIERGE DESK
          </h1>
          <p className="text-sm sm:text-base text-[#2D1B1A]/80 font-light leading-relaxed">
            Our atelier concierge is dedicated to providing unhurried counsel regarding our body care ritual, bespoke gift orders, and private appointments.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Contact Information */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#FFFFFF] border border-[#E8D5C4] p-8 space-y-6 shadow-xs">
              <h3 className="font-serif text-xl font-semibold text-[#2D1B1A] border-b border-[#E8D5C4] pb-4">
                Atelier Headquarters
              </h3>

              <div className="space-y-4 text-xs text-[#2D1B1A]/80">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#6B2C3E] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-[#2D1B1A]">Creative Studio & Flagship</span>
                    <p>Place Vendôme, Paris · Beverly Hills Atelier, CA</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#6B2C3E] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-[#2D1B1A]">Direct Electronic Dispatch</span>
                    <p>concierge@sanabeauty.luxury</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#6B2C3E] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-[#2D1B1A]">Concierge Hours</span>
                    <p>Monday – Saturday, 9:00 AM – 7:00 PM EST</p>
                  </div>
                </div>

                {/* Quick Social Connect in Headquarters Card */}
                <div className="border-t border-[#E8D5C4] pt-4 space-y-2">
                  <span className="text-[10px] uppercase tracking-wider text-[#2D1B1A]/60 font-semibold block">
                    Digital Atelier Dispatches
                  </span>
                  <SocialLinks variant="minimal" theme="light" />
                </div>
              </div>
            </div>

            <div className="bg-[#2D1B1A] text-[#FAF6F0] p-6 space-y-2">
              <span className="text-[10px] tracking-widest uppercase text-[#D4A574] font-semibold block">
                Bespoke Corporate & Wedding Gifting
              </span>
              <p className="text-xs text-[#E8D5C4]/80 leading-relaxed font-light">
                We accommodate private orders of our rigid Velvet Lollipop presentation boxes with personalized wax seals and custom calligraphy notes.
              </p>
            </div>
          </div>

          {/* Right Contact Form */}
          <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#E8D5C4] p-8 sm:p-10 shadow-xs">
            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in">
                <div className="w-16 h-16 rounded-full bg-[#6B2C3E] text-[#C9A961] mx-auto flex items-center justify-center">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-semibold text-[#2D1B1A]">
                  Message Received with Honor
                </h3>
                <p className="text-xs text-[#2D1B1A]/70 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-[#6B2C3E]">{name}</strong>. A dedicated concierge associate has received your dispatch and will reply within 4 business hours to <strong className="text-[#6B2C3E]">{email}</strong>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <h3 className="font-serif text-xl font-semibold text-[#2D1B1A] border-b border-[#E8D5C4] pb-4">
                  Send A Message to Concierge
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#2D1B1A]/70 mb-1 font-medium">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="e.g. Eleanor Vance"
                      className="w-full bg-[#FAF6F0] border border-[#E8D5C4] px-3.5 py-2.5 focus:outline-hidden focus:border-[#6B2C3E]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#2D1B1A]/70 mb-1 font-medium">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="name@domain.com"
                      className="w-full bg-[#FAF6F0] border border-[#E8D5C4] px-3.5 py-2.5 focus:outline-hidden focus:border-[#6B2C3E]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#2D1B1A]/70 mb-1 font-medium">
                    Topic of Inquiry
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-[#FAF6F0] border border-[#E8D5C4] px-3.5 py-2.5 focus:outline-hidden focus:border-[#6B2C3E]"
                  >
                    <option value="Order & Ritual Consultation">Order & Ritual Consultation</option>
                    <option value="Bespoke Gifting & Presentation Boxes">Bespoke Gifting & Presentation Boxes</option>
                    <option value="Press & Editorial Inquiries">Press & Editorial Inquiries</option>
                    <option value="Private Launch List Inquiries">Private Launch List Inquiries</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#2D1B1A]/70 mb-1 font-medium">
                    Your Message
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={5}
                    placeholder="Describe how we may assist your experience..."
                    className="w-full bg-[#FAF6F0] border border-[#E8D5C4] p-3 focus:outline-hidden focus:border-[#6B2C3E]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="bg-[#6B2C3E] hover:bg-[#85344B] text-[#FAF6F0] px-8 py-3.5 text-xs tracking-[0.2em] uppercase font-semibold transition-colors cursor-pointer"
                  >
                    Dispatch Message
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Digital Atelier & Sensory Salons */}
        <div className="bg-[#FFFFFF] border border-[#E8D5C4] p-8 sm:p-12 shadow-xs space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E8D5C4] pb-6">
            <div className="space-y-1.5 max-w-xl">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#6B2C3E] font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C9A961]" />
                Digital Atelier & Sensory Salons
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#2D1B1A]">
                Follow SANA BEAUTY Across The Web
              </h2>
              <p className="text-xs sm:text-sm text-[#2D1B1A]/70 font-light leading-relaxed">
                Connect with our official channels for unreleased formulation diaries, olfactory essays, ritual demonstrations, and private salon announcements.
              </p>
            </div>
            <div className="shrink-0 text-xs text-[#6B2C3E] font-serif italic">
              @sanabeauty.atelier
            </div>
          </div>

          <SocialLinks variant="detailed" theme="light" columns={3} />
        </div>
      </div>
    </main>
  );
};


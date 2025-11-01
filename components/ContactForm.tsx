"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData } from "@/lib/validations";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus("success");
        reset();
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      // Log alleen in development
      if (process.env.NODE_ENV !== 'production') {
        console.error("Form submission error:", error);
      }
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm border border-neutral-200">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Honeypot field - hidden from users */}
        <div className="hidden" aria-hidden="true">
          <Label htmlFor="website">Website (laat dit veld leeg)</Label>
          <Input
            id="website"
            {...register("website")}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div>
          <Label htmlFor="name">Naam *</Label>
          <Input
            id="name"
            {...register("name")}
            placeholder="Jouw volledige naam"
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p id="name-error" className="text-sm text-error mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="email">E-mailadres *</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder="jouw@email.nl"
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className="text-sm text-error mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="phone">Telefoonnummer *</Label>
          <Input
            id="phone"
            type="tel"
            {...register("phone")}
            placeholder="06 12345678"
            aria-invalid={errors.phone ? "true" : "false"}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
          {errors.phone && (
            <p id="phone-error" className="text-sm text-error mt-1">
              {errors.phone.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="role">Ik ben een *</Label>
          <Select
            id="role"
            {...register("role")}
            aria-invalid={errors.role ? "true" : "false"}
            aria-describedby={errors.role ? "role-error" : undefined}
          >
            <option value="">Selecteer een optie</option>
            <option value="ouder">Ouder/verzorger</option>
            <option value="jongere">Jongere</option>
            <option value="verwijzer">Verwijzer/professional</option>
            <option value="anders">Anders</option>
          </Select>
          {errors.role && (
            <p id="role-error" className="text-sm text-error mt-1">
              {errors.role.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="message">Bericht *</Label>
          <Textarea
            id="message"
            {...register("message")}
            placeholder="Waar kunnen we je mee helpen?"
            rows={5}
            aria-invalid={errors.message ? "true" : "false"}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          {errors.message && (
            <p id="message-error" className="text-sm text-error mt-1">
              {errors.message.message}
            </p>
          )}
        </div>

        <div>
          <div className="flex items-start gap-2">
            <Checkbox
              id="privacy"
              {...register("privacy")}
              aria-invalid={errors.privacy ? "true" : "false"}
              aria-describedby={errors.privacy ? "privacy-error" : undefined}
            />
            <Label htmlFor="privacy" className="text-sm font-normal cursor-pointer">
              Ik ga akkoord met het{" "}
              <a
                href="/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                privacybeleid
              </a>{" "}
              en geef toestemming voor het verwerken van mijn gegevens. *
            </Label>
          </div>
          {errors.privacy && (
            <p id="privacy-error" className="text-sm text-error mt-1">
              {errors.privacy.message}
            </p>
          )}
        </div>

        {submitStatus === "success" && (
          <div className="flex items-center gap-2 p-4 bg-success/10 text-success rounded-lg">
            <CheckCircle className="w-5 h-5" />
            <p>
              Bedankt voor je bericht! We nemen binnen 2 werkdagen contact met je op.
            </p>
          </div>
        )}

        {submitStatus === "error" && (
          <div className="flex items-center gap-2 p-4 bg-error/10 text-error rounded-lg">
            <AlertCircle className="w-5 h-5" />
            <p>
              Er ging iets mis. Probeer het later opnieuw of bel ons direct op
              045 - 123 4567.
            </p>
          </div>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full"
          size="lg"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Verzenden...
            </>
          ) : (
            "Verstuur bericht"
          )}
        </Button>

        <p className="text-xs text-neutral-600 text-center">
          * Verplichte velden
        </p>
      </form>
    </div>
  );
}




import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { emailConfig } from "@/lib/emailConfig";

const Index = () => {
  const [practiceType, setPracticeType] = useState("medical");
  const [selectedSystems, setSelectedSystems] = useState<string[]>([]);
  const [othersText, setOthersText] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    companyName: "",
    positions: [] as string[],
    minimumExperience: "",
    practiceType: "medical",
    softwareSystems: [] as string[],
    customSoftware: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const medicalSoftwareOptions = [
    "Epic",
    "Cerner",
    "Allscripts",
    "NextGen",
    "eClinicalWorks",
    "Practice Fusion",
    "Athenahealth",
    "Greenway Health",
    "Kareo",
    "ChartLogic",
    "Others (specify name)",
  ];

  const dentalSoftwareOptions = [
    { name: "Dentrix", selected: false },
    { name: "Open Dental", selected: false },
    { name: "Dexis", selected: false },
    { name: "PracticeWorks", selected: false },
    { name: "Apteryx", selected: false },
    { name: "Others (specify name)", selected: true },
    { name: "Eaglesoft", selected: false },
    { name: "Curve Dental", selected: false },
    { name: "Carestream", selected: false },
    { name: "SoftDent", selected: false },
    { name: "Dolphin", selected: false },
  ];

  const currentSoftwareOptions =
    practiceType === "dental"
      ? dentalSoftwareOptions.map((option) => option.name)
      : medicalSoftwareOptions;

  const handleSystemToggle = (system: string) => {
    setSelectedSystems((prev) =>
      prev.includes(system)
        ? prev.filter((s) => s !== system)
        : [...prev, system],
    );

    // Clear others text if unchecking "Others (specify name)"
    if (
      system === "Others (specify name)" &&
      selectedSystems.includes(system)
    ) {
      setOthersText("");
    }
  };

  const handlePositionToggle = (position: string) => {
    setFormData((prev) => ({
      ...prev,
      positions: prev.positions.includes(position)
        ? prev.positions.filter((p) => p !== position)
        : [...prev.positions, position],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Initialize EmailJS (you'll need to get these values from EmailJS dashboard)
      emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key

      // Prepare email template parameters
      const templateParams = {
        to_email_1: "adnankhalid@cedarfinancial.com",
        to_email_2: "zjaved@cedarfinancial.com",
        company_name: formData.companyName,
        positions_needed: formData.positions.join(", ") || "None selected",
        minimum_experience: formData.minimumExperience,
        practice_type:
          practiceType.charAt(0).toUpperCase() + practiceType.slice(1),
        software_systems: selectedSystems.join(", ") || "None selected",
        custom_software: othersText || "N/A",
        submission_date: new Date().toLocaleDateString(),
        submission_time: new Date().toLocaleTimeString(),
        message: `
New staffing request from ${formData.companyName}:

Company: ${formData.companyName}
Practice Type: ${practiceType.charAt(0).toUpperCase() + practiceType.slice(1)}
Positions Needed: ${formData.positions.join(", ") || "None selected"}
Minimum Experience: ${formData.minimumExperience}
Software Systems: ${selectedSystems.join(", ") || "None selected"}
${othersText ? `Custom Software: ${othersText}` : ""}

Submitted on: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
        `.trim(),
      };

      // Send email using EmailJS
      const result = await emailjs.send(
        "YOUR_SERVICE_ID", // Replace with your EmailJS service ID
        "YOUR_TEMPLATE_ID", // Replace with your EmailJS template ID
        templateParams,
      );

      console.log("Email sent successfully:", result);

      // Reset form on success
      setFormData({
        companyName: "",
        positions: [],
        minimumExperience: "",
        practiceType: "medical",
        softwareSystems: [],
        customSoftware: "",
      });
      setSelectedSystems([]);
      setOthersText("");
      setPracticeType("medical");

      setSubmitStatus("success");
    } catch (error) {
      console.error("Email sending failed:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isOthersSelected = selectedSystems.includes("Others (specify name)");

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-20">
          <div className="flex items-center">
            <img
              src="/placeholder.svg"
              alt="Remote Scouts"
              className="h-8 w-auto"
            />
          </div>
          <nav className="hidden md:flex items-center space-x-1">
            <Button
              variant="ghost"
              className="text-gray-700 hover:text-rs-primary"
            >
              Why Remote Scouts?
              <svg
                className="ml-1 h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </Button>
            <Button
              variant="ghost"
              className="text-gray-700 hover:text-rs-primary"
            >
              Services
              <svg
                className="ml-1 h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </Button>
            <Button
              variant="ghost"
              className="text-gray-700 hover:text-rs-primary"
            >
              Locations
              <svg
                className="ml-1 h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </Button>
            <Button
              variant="ghost"
              className="text-gray-700 hover:text-rs-primary"
            >
              Resources
              <svg
                className="ml-1 h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </Button>
          </nav>
          <Button className="bg-rs-primary hover:bg-rs-primary-dark text-white">
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            800-967-6949
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[700px] flex items-center justify-center bg-rs-gray-50">
        <div className="absolute inset-0">
          <img
            src="/placeholder.svg"
            alt="Medical professionals"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-rs-blue-900/90 via-rs-blue-900/80 to-rs-blue-900/30"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 lg:px-20">
          <div className="max-w-5xl mx-auto text-center text-white">
            {/* Badge */}
            <div className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-4 py-2 mb-6">
              <svg
                className="mr-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-sm font-semibold">
                HIPAA Compliant Staffing Solutions
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Medical & Dental Professionals (Bilingual Available)
            </h1>

            {/* Pricing */}
            <div className="flex items-center justify-center mb-6">
              <span className="text-2xl md:text-3xl font-semibold text-blue-100">
                Starting From Just{" "}
              </span>
              <span className="ml-2 text-3xl md:text-5xl font-bold">
                $12.50/hr
              </span>
            </div>

            {/* Description */}
            <p className="text-lg md:text-xl text-blue-50 mb-8 max-w-3xl mx-auto">
              Positions filled by Remote Scouts - your trusted partner for
              remote healthcare staffing solutions.
            </p>

            {/* CTA Button */}
            <Button
              size="lg"
              className="bg-rs-orange hover:bg-rs-orange/90 text-white text-lg px-8 py-6 mb-12"
            >
              Start receiving resumes now
              <svg
                className="ml-2 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Button>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center rounded-full bg-white/10 backdrop-blur-sm px-4 py-2">
                <svg
                  className="mr-2 h-8 w-8 text-rs-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <span className="text-blue-50 text-lg">HIPAA Compliant</span>
              </div>
              <div className="flex items-center rounded-full bg-white/10 backdrop-blur-sm px-4 py-2">
                <svg
                  className="mr-2 h-8 w-8 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-blue-50 text-lg">24/7 Support</span>
              </div>
              <div className="flex items-center rounded-full bg-white/10 backdrop-blur-sm px-4 py-2">
                <svg
                  className="mr-2 h-8 w-8 text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-blue-50 text-lg">
                  Verified Professionals
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-20">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="border-rs-primary/30 bg-rs-primary/5 text-rs-primary mb-4"
            >
              Our Services
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-rs-text mb-4">
              Our Remote Healthcare Services
            </h2>
            <p className="text-xl md:text-2xl text-rs-text-light max-w-4xl mx-auto">
              Comprehensive solutions designed to streamline your practice
              operations and enhance patient care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Service Cards */}
            <Card className="border-rs-primary bg-gradient-to-br from-white to-blue-50/20 p-6 text-center">
              <CardContent className="p-0">
                <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-xl shadow-lg flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-rs-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-rs-text mb-2">
                  Appointment Schedulers
                </h3>
                <p className="text-rs-text-light">
                  Keep your calendar full and your patients on time with
                  proactive, tailored scheduling support.
                </p>
              </CardContent>
            </Card>

            <Card className="border-rs-primary bg-gradient-to-br from-white to-blue-50/20 p-6 text-center">
              <CardContent className="p-0">
                <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-xl shadow-lg flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-rs-orange"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-rs-text mb-2">
                  Insurance Verifiers
                </h3>
                <p className="text-rs-text-light">
                  Minimize no-shows and claim denials. We verify coverage and
                  benefits for every patient in advance
                </p>
              </CardContent>
            </Card>

            <Card className="border-rs-primary bg-gradient-to-br from-white to-blue-50/20 p-6 text-center">
              <CardContent className="p-0">
                <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-xl shadow-lg flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-yellow-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-rs-text mb-2">
                  Billers & Collectors
                </h3>
                <p className="text-rs-text-light">
                  Accelerate your payments. We handle accurate coding, billing,
                  and professional follow-ups on outstanding balances.
                </p>
              </CardContent>
            </Card>

            <Card className="border-rs-primary bg-gradient-to-br from-white to-blue-50/20 p-6 text-center">
              <CardContent className="p-0">
                <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-xl shadow-lg flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-purple-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-rs-text mb-2">
                  Front Desk Support
                </h3>
                <p className="text-rs-text-light">
                  Let your in-office team focus on patient care. Our remote
                  staff manages calls, confirmations, and intake.
                </p>
              </CardContent>
            </Card>

            <Card className="border-rs-primary bg-gradient-to-br from-white to-blue-50/20 p-6 text-center">
              <CardContent className="p-0">
                <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-xl shadow-lg flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-rs-text mb-2">
                  Claim Management Specialists
                </h3>
                <p className="text-rs-text-light">
                  Recover more revenue without extra admin work. We manage
                  denials, resubmissions, and appeals.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-rs-gray-50">
        <div className="container mx-auto px-4 lg:px-20">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="border-rs-primary/30 bg-rs-primary/5 text-rs-primary mb-4"
            >
              Why Choose Us
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-rs-text mb-4">
              Let's Build Your Team With Remote Scouts
            </h2>
            <p className="text-xl md:text-2xl text-rs-text-light max-w-4xl mx-auto">
              Our specialized remote healthcare professionals integrate
              seamlessly with your practice, delivering immediate value.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white p-6 text-center">
              <CardContent className="p-0">
                <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-xl shadow-lg flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-rs-text mb-2">
                  Instant Returns
                </h3>
                <p className="text-rs-text-light">
                  Start seeing financial returns immediately. Our precision
                  assessment guarantees a team that drives your bottom line from
                  day one.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white p-6 text-center">
              <CardContent className="p-0">
                <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-xl shadow-lg flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-purple-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a1 1 0 01-1-1V9a1 1 0 011-1h1a2 2 0 100-4H4a1 1 0 01-1-1V4a1 1 0 011-1h3a1 1 0 001-1v1z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-rs-text mb-2">
                  Seamless Integration
                </h3>
                <p className="text-rs-text-light">
                  Our pre-vetted, system-proficient specialists are ready to
                  generate revenue for you, fast.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white p-6 text-center">
              <CardContent className="p-0">
                <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-xl shadow-lg flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-rs-text mb-2">
                  Worry-Free Operations
                </h3>
                <p className="text-rs-text-light">
                  Achieve peak operational excellence and total data security
                  without the administrative burden. Consistent and high-value
                  performance at a fraction of the cost.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 bg-rs-gray-50">
        <div className="container mx-auto px-4 lg:px-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-8">
              Our Remote Healthcare Services
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {/* Standard BPO Solutions */}
            <Card className="bg-white p-8 shadow-lg">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <svg
                    className="w-6 h-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m4 0V9a1 1 0 011-1h4a1 1 0 011 1v12M9 7h6"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-black">
                  Standard BPO Solutions
                </h3>
              </div>

              <div className="space-y-6">
                {[
                  {
                    title: "Hidden Costs & Variable Rates",
                    desc: "Expect tiered pricing and extra fees for taxes, benefits, or management",
                  },
                  {
                    title: "Limited Payment Flexibility",
                    desc: "Typically offer traditional bank transfers only",
                  },
                  {
                    title: "Generic or Untrained Talent",
                    desc: "Often require significant additional training on your specific systems",
                  },
                  {
                    title: "Limited Operating Hours",
                    desc: "Schedules often don't align with demanding practice needs",
                  },
                  {
                    title: "Varying Security Standards",
                    desc: "May not meet stringent healthcare data protection requirements",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                      <svg
                        className="w-2.5 h-2.5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-rs-text text-lg">
                        {item.title}
                      </h4>
                      <p className="text-rs-text-light">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Remote Scouts */}
            <Card className="bg-rs-primary p-8 shadow-lg text-white">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4">
                  <svg
                    className="w-6 h-6 text-rs-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold">Remote Scouts</h3>
              </div>

              <div className="space-y-6">
                {[
                  {
                    title: "Starting From $12.50/hr",
                    desc: "What you see is what you pay. No payroll taxes or hidden fees",
                  },
                  {
                    title: "Earn Credit Card Rewards on Payroll",
                    desc: "Pay with your credit card and rack up valuable points",
                  },
                  {
                    title: "Experienced & Pre-trained Staff",
                    desc: "Our professionals are ready to deploy, skilled in dental/medical operations",
                  },
                  {
                    title: "24/7 Operations",
                    desc: "Our team is available around the clock",
                  },
                  {
                    title: "Enterprise-Grade Security",
                    desc: "Your patient data is safe with robust protocols and HIPAA compliance",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                      <svg
                        className="w-2.5 h-2.5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{item.title}</h4>
                      <p className="text-white/70">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-20">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="border-rs-primary/30 bg-rs-primary/5 text-rs-primary mb-4"
            >
              Testimonials
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-rs-text mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl md:text-2xl text-rs-text-light max-w-4xl mx-auto">
              See how medical and dental practices like yours are thriving with
              Remote Scout
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. Sarah Chen",
                role: "Family Practice, California",
                rating: 3,
                text: "Remote Scouts transformed our practice operations. Their bilingual staff seamlessly integrated with our team, and our patient satisfaction scores have never been higher.",
                bg: "bg-rs-blue-600",
              },
              {
                name: "Dr. Michael Rodriguez",
                role: "Dental Practice, Texas",
                rating: 3,
                text: "The ROI has been incredible. Our claims processing time was cut in half, and their insurance verification team has significantly reduced our denial rates.",
                bg: "bg-red-500",
              },
              {
                name: "Dr. Emily Thompson",
                role: "Medical Center, Florida",
                rating: 3,
                text: "Their front desk support has been exceptional. Our patients love the prompt responses, and we've seen a 40% increase in appointment bookings.",
                bg: "bg-green-600",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="bg-white p-8 shadow-lg">
                <CardContent className="p-0">
                  <div className="flex items-center mb-6">
                    <div
                      className={`w-16 h-16 ${testimonial.bg} rounded-xl flex items-center justify-center mr-4`}
                    >
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-rs-primary text-lg">
                        {testimonial.name}
                      </h4>
                      <p className="text-rs-primary">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-rs-text-light mb-6 leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${i < testimonial.rating ? "text-yellow-400" : "text-gray-300"}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-rs-primary font-semibold">
                      3.0
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* HIPAA Compliance Section */}
      <section className="py-20 bg-rs-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-rs-primary to-rs-primary-dark opacity-90"></div>
        <div className="relative z-10 container mx-auto px-4 lg:px-20">
          <div className="max-w-6xl mx-auto text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              HIPAA Compliance Guaranteed
            </h2>
            <p className="text-lg md:text-xl mb-12 opacity-90">
              Our services include industry-recognized security controls,
              protection of your patient data, meeting and exceeding all HIPAA
              requirements.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: "🔒", title: "Platform Security (SOC2, HITRUST)" },
                { icon: "📋", title: "BAA (Business Associate Agreement)" },
                { icon: "🛡️", title: "24/7 Protected Backups" },
                { icon: "📊", title: "HIPAA Audit Logging" },
              ].map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3">
                    <span className="text-2xl">{item.icon}</span>
                  </div>
                  <span className="font-semibold">{item.title}</span>
                </div>
              ))}
            </div>

            <p className="mt-12 text-lg italic opacity-80">
              Trusted by leading healthcare institutions nationwide
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-rs-gray-50">
        <div className="container mx-auto px-4 lg:px-20">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="border-rs-primary/30 bg-rs-primary/5 text-rs-primary mb-4"
            >
              Get Started Today
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-rs-text mb-4">
              Ready to Offload Your Admin Burden?
            </h2>
            <p className="text-xl md:text-2xl text-rs-text-light max-w-6xl mx-auto opacity-80">
              Stop sacrificing patient care for paperwork. Let Remote Scouts
              Medical build your HIPAA-compliant admin team in days, at a
              fraction of the cost.
            </p>
          </div>

          <Card className="max-w-4xl mx-auto bg-white p-8 shadow-lg">
            <CardContent className="p-0">
              <h3 className="text-2xl font-bold text-rs-text text-center mb-8">
                Speak To a Staffing Specialist Today!
              </h3>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <Label htmlFor="company" className="text-rs-text">
                    Company name<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="company"
                    placeholder="Enter your company name"
                    className="mt-2"
                    value={formData.companyName}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        companyName: e.target.value,
                      }))
                    }
                    required
                  />
                </div>

                <div>
                  <Label className="text-rs-text">
                    Which positions do you need staffing for? (Select all that
                    apply)<span className="text-red-500">*</span>
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    {[
                      "Appointment Scheduling",
                      "Insurance Verification",
                      "Front Desk Support",
                      "Billing & Collections",
                      "Claim Management",
                      "Certified Medical Specialist",
                    ].map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox
                          id={option}
                          checked={formData.positions.includes(option)}
                          onCheckedChange={() => handlePositionToggle(option)}
                        />
                        <Label htmlFor={option} className="text-rs-text">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-rs-text">
                    Minimum Experience<span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.minimumExperience}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        minimumExperience: value,
                      }))
                    }
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select minimum experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-2">1-2 years</SelectItem>
                      <SelectItem value="3-5">3-5 years</SelectItem>
                      <SelectItem value="5+">5+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-rs-text">
                    Are you a Medical Practice or Dental Practice?
                    <span className="text-red-500">*</span>
                  </Label>
                  <RadioGroup
                    value={practiceType}
                    onValueChange={setPracticeType}
                    className="mt-3"
                  >
                    <div
                      className={`flex items-center space-x-2 px-2 py-1 rounded ${practiceType === "medical" ? "border border-rs-primary/30 bg-rs-primary/10" : ""}`}
                    >
                      <RadioGroupItem value="medical" id="medical" />
                      <Label htmlFor="medical" className="text-rs-text">
                        Medical Practice
                      </Label>
                    </div>
                    <div
                      className={`flex items-center space-x-2 px-2 py-1 rounded ${practiceType === "dental" ? "border border-rs-primary/30 bg-rs-primary/10" : ""}`}
                    >
                      <RadioGroupItem value="dental" id="dental" />
                      <Label htmlFor="dental" className="text-rs-text">
                        Dental Practice
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label className="text-rs-text mb-4 block">
                    Which systems does your practice currently use? (Select all
                    that apply)
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentSoftwareOptions.map((system) => (
                      <div key={system}>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={system}
                            checked={selectedSystems.includes(system)}
                            onCheckedChange={() => handleSystemToggle(system)}
                          />
                          <Label htmlFor={system} className="text-rs-text">
                            {system}
                          </Label>
                        </div>
                        {system === "Others (specify name)" &&
                          isOthersSelected && (
                            <div className="mt-3 ml-6">
                              <Input
                                placeholder="Please specify the system name..."
                                value={othersText}
                                onChange={(e) => setOthersText(e.target.value)}
                                className="w-full"
                              />
                            </div>
                          )}
                      </div>
                    ))}
                  </div>
                </div>

                {submitStatus === "success" && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 text-green-500 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-green-700 font-medium">
                        Thank you! Your request has been submitted successfully.
                        We'll be in touch soon.
                      </span>
                    </div>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 text-red-500 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      <span className="text-red-700 font-medium">
                        There was an error submitting your request. Please try
                        again.
                      </span>
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={
                    isSubmitting ||
                    !formData.companyName ||
                    formData.positions.length === 0 ||
                    !formData.minimumExperience
                  }
                  className="w-full bg-rs-primary hover:bg-rs-primary-dark disabled:opacity-50 disabled:cursor-not-allowed text-white text-lg py-6"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Submitting...
                    </div>
                  ) : (
                    "Get Resumes Now"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-rs-blue-950 text-white">
        <div className="container mx-auto px-4 lg:px-20 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2">
              <img
                src="/placeholder.svg"
                alt="Remote Scouts"
                className="h-8 w-auto mb-4"
              />
              <p className="text-blue-200 mb-8 max-w-sm">
                We help companies strengthen their competitive advantage by
                taking a global approach to sourcing, tapping into the
                best-in-class talent.
              </p>
              <img
                src="/placeholder.svg"
                alt="RMAi logo"
                className="h-12 w-auto"
              />
            </div>

            <div>
              <h4 className="font-bold text-white uppercase mb-4">About</h4>
              <ul className="space-y-2 text-blue-200">
                <li>
                  <a href="#" className="hover:text-white">
                    About Remote Scouts
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    FAQ's
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white uppercase mb-4">
                For Clients
              </h4>
              <ul className="space-y-2 text-blue-200">
                <li>
                  <a href="#" className="hover:text-white">
                    Accountants
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Debt Collectors
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Digital Marketing Specialists
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Medical Billers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Paralegals
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Virtual Assistants
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white uppercase mb-4">Blogs</h4>
              <ul className="space-y-2 text-blue-200">
                <li>
                  <a href="#" className="hover:text-white">
                    Exploring Offshore Staffing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Pakistan vs India
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Top 5 Digital Marketing Agencies
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Top 25 Most Influential PPC
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <hr className="border-blue-800 my-8" />

          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center space-x-4 text-blue-200 mb-2">
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  800-967-6949
                </div>
              </div>
              <div className="flex items-center space-x-4 text-blue-200">
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  info@remotescouts.com
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              {["facebook", "twitter", "instagram", "youtube", "linkedin"].map(
                (social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-6 h-6 text-blue-200 hover:text-white"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </a>
                ),
              )}
            </div>
          </div>
        </div>

        <div className="bg-white py-4">
          <div className="container mx-auto px-4 lg:px-20 flex flex-col md:flex-row justify-between items-center text-rs-blue-950">
            <p>© 2024 Remote Scouts All rights reserved.</p>
            <div className="flex space-x-6 mt-2 md:mt-0">
              <a href="#" className="hover:text-rs-primary">
                Legal Notice
              </a>
              <a href="#" className="hover:text-rs-primary">
                Terms of Use
              </a>
              <a href="#" className="hover:text-rs-primary">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText, Users, TrendingUp, Award } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const Careers = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    coverLetter: "",
    resume: null as File | null
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Please upload a PDF or Word document.");
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Please upload a file smaller than 5MB.");
        return;
      }

      setFormData(prev => ({
        ...prev,
        resume: file
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.phone || !formData.position || !formData.experience) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.resume && formData.resume.size > 5 * 1024 * 1024) {
      toast.error('Resume file size should not exceed 5MB');
      return;
    }

    try {
      const { error } = await supabase
        .from('career_applications')
        .insert({
          user_id: user?.id || null,
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          position: formData.position,
          experience: formData.experience,
          cover_letter: formData.coverLetter || null,
          resume_url: null,
        });

      if (error) throw error;

      toast.success('Application submitted successfully! We will review it and get back to you soon.');
      
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        position: "",
        experience: "",
        coverLetter: "",
        resume: null
      });
    } catch (error: any) {
      toast.error(error.message || 'Failed to submit application');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-brandblue-600 to-brandblue-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold mb-6">Join Our Team</h1>
            <p className="text-xl max-w-3xl">
              Be part of Fingrandz Business Solutions and help us revolutionize financial consulting through innovative telemarketing strategies.
            </p>
          </div>
        </div>

        {/* Why Join Us Section */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Why Join Fingrandz?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <Users className="h-12 w-12 text-brandblue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Empowered Team</h3>
                <p className="text-gray-600">Work with entrepreneurial, bold, and result-oriented professionals.</p>
              </div>
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-brandblue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Growth Opportunities</h3>
                <p className="text-gray-600">Advance your career with comprehensive training and development programs.</p>
              </div>
              <div className="text-center">
                <Award className="h-12 w-12 text-brandblue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Quality First</h3>
                <p className="text-gray-600">Be part of a company that believes "Quality is Customer" at every stage.</p>
              </div>
              <div className="text-center">
                <FileText className="h-12 w-12 text-brandblue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Industry Expertise</h3>
                <p className="text-gray-600">Learn from leadership with decades of banking and insurance experience.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Application Form Section */}
        <div className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center">Apply for a Position</CardTitle>
                <p className="text-center text-gray-600">
                  Ready to start your journey with us? Fill out the form below and upload your resume.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="position">Position Applied For *</Label>
                      <Input
                        id="position"
                        name="position"
                        value={formData.position}
                        onChange={handleInputChange}
                        placeholder="e.g., Teleconsultant, Sales Associate"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Input
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      placeholder="e.g., 2 years"
                    />
                  </div>

                  <div>
                    <Label htmlFor="resume">Upload Resume *</Label>
                    <div className="mt-2">
                      <div className="flex items-center justify-center w-full">
                        <label htmlFor="resume" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-4 text-gray-500" />
                            <p className="mb-2 text-sm text-gray-500">
                              <span className="font-semibold">Click to upload</span> your resume
                            </p>
                            <p className="text-xs text-gray-500">PDF, DOC, or DOCX (MAX. 5MB)</p>
                          </div>
                          <input
                            id="resume"
                            name="resume"
                            type="file"
                            className="hidden"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                            required
                          />
                        </label>
                      </div>
                      {formData.resume && (
                        <p className="mt-2 text-sm text-green-600">
                          ✓ {formData.resume.name} uploaded successfully
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="coverLetter">Cover Letter (Optional)</Label>
                    <Textarea
                      id="coverLetter"
                      name="coverLetter"
                      value={formData.coverLetter}
                      onChange={handleInputChange}
                      placeholder="Tell us why you'd be a great fit for our team..."
                      rows={4}
                    />
                  </div>

                  <Button type="submit" className="w-full bg-brandblue-600 hover:bg-brandblue-700">
                    Submit Application
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Open Positions Section */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Current Openings</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Teleconsultant</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Join our telemarketing team to provide financial consultation to salaried individuals.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 1-3 years sales experience</li>
                    <li>• Excellent communication skills</li>
                    <li>• Financial services knowledge preferred</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sales Associate</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Drive lead generation and conversion for investment and insurance products.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Fresh graduates welcome</li>
                    <li>• Strong interpersonal skills</li>
                    <li>• Goal-oriented mindset</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Team Leader</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Lead and mentor our teleconsulting teams to achieve performance targets.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 3+ years team management</li>
                    <li>• Training and coaching experience</li>
                    <li>• Performance management skills</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Careers;

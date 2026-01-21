"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Wifi,
  CreditCard,
  Calendar,
  FileText,
  Download,
  Palette,
  QrCode,
  Link2,
  CheckCircle2,
  Sparkles,
  Moon,
  Sun,
} from "lucide-react";

type QRType = "wifi" | "payment" | "event" | "url" | "text";

interface WiFiData {
  ssid: string;
  password: string;
  encryption: "WPA" | "WEP" | "nopass";
}

interface PaymentData {
  type: "upi";
  upiId: string;
  amount: string;
  note: string;
}

interface EventData {
  name: string;
  location: string;
  start: string;
  end: string;
  description: string;
}

const QRCodeCreator: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<QRType>("wifi");
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [qrColor, setQrColor] = useState<string>("#000000");
  const [qrBgColor, setQrBgColor] = useState<string>("#FFFFFF");
  const [qrSize, setQrSize] = useState<number>(200);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const [wifiData, setWifiData] = useState<WiFiData>({
    ssid: "",
    password: "",
    encryption: "WPA",
  });

  const [paymentData, setPaymentData] = useState<PaymentData>({
    type: "upi",
    upiId: "",
    amount: "",
    note: "",
  });

  const [eventData, setEventData] = useState<EventData>({
    name: "",
    location: "",
    start: "",
    end: "",
    description: "",
  });

  const [url, setUrl] = useState<string>("");
  const [plainText, setPlainText] = useState<string>("");

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const generateQRData = (): string => {
    let data = "";
    switch (activeTab) {
      case "wifi":
        if (wifiData.ssid) {
          const esc = (s: string) =>
            s.replace(/\\/g, "\\\\").replace(/;/g, "\\;");

          const ssid = esc(wifiData.ssid);
          const pass = esc(wifiData.password);

          if (wifiData.encryption === "nopass") {
            data = `WIFI:T:nopass;S:${ssid};;`;
          } else {
            data = `WIFI:T:${wifiData.encryption};S:${ssid};P:${pass};;`;
          }
        }

        break;
      case "url":
        data = url;
        break;
      case "text":
        data = plainText;
        break;
    }
    return data;
  };

  const handleGenerate = async (): Promise<void> => {
    const data = generateQRData();
    if (!data) {
      alert("Please fill in the required fields");
      return;
    }

    setIsGenerating(true);

    try {
      const response = await fetch("/api/generate-qr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data,
          color: qrColor,
          bgColor: qrBgColor,
          size: qrSize,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate QR code");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setQrDataUrl(url);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (error) {
      console.error("Error generating QR code:", error);
      alert("Failed to generate QR code. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = (): void => {
    if (qrDataUrl) {
      const link = document.createElement("a");
      link.download = `qrcode-${activeTab}-${Date.now()}.png`;
      link.href = qrDataUrl;
      link.click();
    }
  };

  // Regenerate QR code when customization changes (only if QR already exists)
  useEffect(() => {
    if (qrDataUrl) {
      handleGenerate();
    }
  }, [qrColor, qrBgColor, qrSize]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl">
                <QrCode className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  QR Studio
                </h1>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Professional QR Code Generator
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span className="hidden sm:inline">Free & Unlimited</span>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsDark(!isDark)}
                className="rounded-full border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                ) : (
                  <Moon className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - QR Preview */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-colors duration-300">
              <CardHeader className="space-y-1">
                <CardTitle className="text-xl text-slate-900 dark:text-slate-100">
                  Preview
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  Your QR code will appear here
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="flex items-center justify-center p-8 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors duration-300">
                    {qrDataUrl ? (
                      <div className="relative">
                        <img
                          src={qrDataUrl}
                          alt="Generated QR Code"
                          className="max-w-full rounded-lg shadow-lg"
                          style={{
                            width: `${qrSize}px`,
                            height: `${qrSize}px`,
                          }}
                        />
                        {showSuccess && (
                          <div className="absolute inset-0 flex items-center justify-center bg-white/90 dark:bg-slate-900/90 rounded-lg animate-in fade-in zoom-in duration-200">
                            <div className="text-center">
                              <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400 mx-auto mb-2" />
                              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                                Generated!
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <div className="w-20 h-20 mx-auto mb-4 bg-slate-200 dark:bg-slate-700 rounded-2xl flex items-center justify-center transition-colors duration-300">
                          <QrCode className="w-10 h-10 text-slate-400 dark:text-slate-500" />
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">
                          Configure and generate
                        </p>
                      </div>
                    )}
                  </div>
                  {qrDataUrl && (
                    <Button
                      onClick={handleDownload}
                      className="w-full mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download PNG
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Customization Card */}
            <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-colors duration-300">
              <CardHeader className="space-y-1">
                <div className="flex items-center gap-2">
                  <Palette className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <CardTitle className="text-lg text-slate-900 dark:text-slate-100">
                    Customize
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="size"
                    className="text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Size: {qrSize}px
                  </Label>
                  <input
                    id="size"
                    type="range"
                    min="200"
                    max="600"
                    step="50"
                    value={qrSize}
                    onChange={(e) => setQrSize(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Input Forms */}
          <div className="lg:col-span-2">
            <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-colors duration-300">
              <CardHeader className="space-y-1">
                <CardTitle className="text-xl text-slate-900 dark:text-slate-100">
                  QR Code Content
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  Select a type and fill in the details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs
                  value={activeTab}
                  onValueChange={(value) => setActiveTab(value as QRType)}
                  className="w-full"
                >
                  <TabsList className="grid grid-cols-5 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                    <TabsTrigger
                      value="wifi"
                      className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-indigo-700 dark:data-[state=active]:text-indigo-400 data-[state=active]:shadow-sm"
                    >
                      <Wifi className="w-4 h-4 mr-2" />
                      <span className="hidden sm:inline">WiFi</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="payment"
                      className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-indigo-700 dark:data-[state=active]:text-indigo-400 data-[state=active]:shadow-sm"
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      <span className="hidden sm:inline">Pay</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="event"
                      className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-indigo-700 dark:data-[state=active]:text-indigo-400 data-[state=active]:shadow-sm"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="hidden sm:inline">Event</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="url"
                      className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-indigo-700 dark:data-[state=active]:text-indigo-400 data-[state=active]:shadow-sm"
                    >
                      <Link2 className="w-4 h-4 mr-2" />
                      <span className="hidden sm:inline">URL</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="text"
                      className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-indigo-700 dark:data-[state=active]:text-indigo-400 data-[state=active]:shadow-sm"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      <span className="hidden sm:inline">Text</span>
                    </TabsTrigger>
                  </TabsList>

                  {/* WiFi Tab */}
                  <TabsContent value="wifi" className="space-y-4 mt-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="ssid"
                        className="text-sm font-medium text-slate-700 dark:text-slate-300"
                      >
                        Network Name (SSID)
                      </Label>
                      <Input
                        id="ssid"
                        placeholder="MyWiFiNetwork"
                        value={wifiData.ssid}
                        onChange={(e) =>
                          setWifiData({ ...wifiData, ssid: e.target.value })
                        }
                        className="border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 bg-white dark:bg-slate-800 [color-scheme:light] dark:[color-scheme:dark]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="password"
                        className="text-sm font-medium text-slate-700 dark:text-slate-300"
                      >
                        Password
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter WiFi password"
                        value={wifiData.password}
                        onChange={(e) =>
                          setWifiData({ ...wifiData, password: e.target.value })
                        }
                        className="border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 bg-white dark:bg-slate-800 [color-scheme:light] dark:[color-scheme:dark]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="encryption"
                        className="text-sm font-medium text-slate-700 dark:text-slate-300"
                      >
                        Security Type
                      </Label>
                      <Select
                        value={wifiData.encryption}
                        onValueChange={(value: "WPA" | "WEP" | "nopass") =>
                          setWifiData({ ...wifiData, encryption: value })
                        }
                      >
                        <SelectTrigger className="border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                          <SelectItem value="WPA">WPA/WPA2/WPA3</SelectItem>
                          <SelectItem value="WEP">WEP</SelectItem>
                          <SelectItem value="nopass">Open Network</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TabsContent>

                  {/* Payment Tab */}
                  <TabsContent value="payment" className="space-y-4 mt-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="upiId"
                        className="text-sm font-medium text-slate-700 dark:text-slate-300"
                      >
                        UPI ID
                      </Label>
                      <Input
                        id="upiId"
                        placeholder="yourname@upi"
                        value={paymentData.upiId}
                        onChange={(e) =>
                          setPaymentData({
                            ...paymentData,
                            upiId: e.target.value,
                          })
                        }
                        className="border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 bg-white dark:bg-slate-800 [color-scheme:light] dark:[color-scheme:dark]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="amount"
                        className="text-sm font-medium text-slate-700 dark:text-slate-300"
                      >
                        Amount (Optional)
                      </Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="0.00"
                        value={paymentData.amount}
                        onChange={(e) =>
                          setPaymentData({
                            ...paymentData,
                            amount: e.target.value,
                          })
                        }
                        className="border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 bg-white dark:bg-slate-800 [color-scheme:light] dark:[color-scheme:dark]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="note"
                        className="text-sm font-medium text-slate-700 dark:text-slate-300"
                      >
                        Payment Note
                      </Label>
                      <Input
                        id="note"
                        placeholder="For services"
                        value={paymentData.note}
                        onChange={(e) =>
                          setPaymentData({
                            ...paymentData,
                            note: e.target.value,
                          })
                        }
                        className="border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 bg-white dark:bg-slate-800 [color-scheme:light] dark:[color-scheme:dark]"
                      />
                    </div>
                  </TabsContent>

                  {/* Event Tab */}
                  <TabsContent value="event" className="space-y-4 mt-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="eventName"
                        className="text-sm font-medium text-slate-700 dark:text-slate-300"
                      >
                        Event Name
                      </Label>
                      <Input
                        id="eventName"
                        placeholder="Annual Conference 2024"
                        value={eventData.name}
                        onChange={(e) =>
                          setEventData({ ...eventData, name: e.target.value })
                        }
                        className="border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 bg-white dark:bg-slate-800 [color-scheme:light] dark:[color-scheme:dark]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="location"
                        className="text-sm font-medium text-slate-700 dark:text-slate-300"
                      >
                        Location
                      </Label>
                      <Input
                        id="location"
                        placeholder="Convention Center"
                        value={eventData.location}
                        onChange={(e) =>
                          setEventData({
                            ...eventData,
                            location: e.target.value,
                          })
                        }
                        className="border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 bg-white dark:bg-slate-800 [color-scheme:light] dark:[color-scheme:dark]"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="startDate"
                          className="text-sm font-medium text-slate-700 dark:text-slate-300"
                        >
                          Start
                        </Label>
                        <Input
                          id="startDate"
                          type="datetime-local"
                          value={eventData.start}
                          onChange={(e) =>
                            setEventData({
                              ...eventData,
                              start: e.target.value,
                            })
                          }
                          className="border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800 [color-scheme:light] dark:[color-scheme:dark]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="endDate"
                          className="text-sm font-medium text-slate-700 dark:text-slate-300"
                        >
                          End
                        </Label>
                        <Input
                          id="endDate"
                          type="datetime-local"
                          value={eventData.end}
                          onChange={(e) =>
                            setEventData({ ...eventData, end: e.target.value })
                          }
                          className="border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800 [color-scheme:light] dark:[color-scheme:dark]"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="description"
                        className="text-sm font-medium text-slate-700 dark:text-slate-300"
                      >
                        Description
                      </Label>
                      <Input
                        id="description"
                        placeholder="Event details"
                        value={eventData.description}
                        onChange={(e) =>
                          setEventData({
                            ...eventData,
                            description: e.target.value,
                          })
                        }
                        className="border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 bg-white dark:bg-slate-800 [color-scheme:light] dark:[color-scheme:dark]"
                      />
                    </div>
                  </TabsContent>

                  {/* URL Tab */}
                  <TabsContent value="url" className="space-y-4 mt-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="url"
                        className="text-sm font-medium text-slate-700 dark:text-slate-300"
                      >
                        Website URL
                      </Label>
                      <Input
                        id="url"
                        placeholder="https://example.com"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 bg-white dark:bg-slate-800 [color-scheme:light] dark:[color-scheme:dark]"
                      />
                    </div>
                    <div className="p-4 bg-indigo-50 dark:bg-indigo-950/30 rounded-lg border border-indigo-100 dark:border-indigo-900/50">
                      <p className="text-sm text-slate-700 dark:text-slate-300">
                        Perfect for business cards, menus, flyers, and marketing
                        materials.
                      </p>
                    </div>
                  </TabsContent>

                  {/* Text Tab */}
                  <TabsContent value="text" className="space-y-4 mt-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="text"
                        className="text-sm font-medium text-slate-700 dark:text-slate-300"
                      >
                        Plain Text
                      </Label>
                      <textarea
                        id="text"
                        rows={6}
                        placeholder="Enter any text to encode..."
                        value={plainText}
                        onChange={(e) => setPlainText(e.target.value)}
                        className="w-full border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 bg-white dark:bg-slate-800 rounded-md p-3 resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent [color-scheme:light] dark:[color-scheme:dark]"
                      />
                    </div>
                  </TabsContent>
                </Tabs>

                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-6 text-base shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <QrCode className="w-5 h-5 mr-2" />
                      Generate QR Code
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-colors duration-300">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-950/50 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Wifi className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                      Easy Sharing
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Share WiFi credentials instantly
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-colors duration-300">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-950/50 rounded-full flex items-center justify-center mx-auto mb-3">
                      <CreditCard className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                      Quick Payments
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Accept UPI payments easily
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-colors duration-300">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-950/50 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Download className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                      High Quality
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Download in PNG format
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 mt-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col items-center space-y-4">
            {/* Main Description */}
            <p className="text-center text-sm text-slate-600 dark:text-slate-400">
              Professional QR Code Generator • Free & Unlimited • No
              Registration Required
            </p>

            {/* Divider */}
            <div className="w-16 h-px bg-slate-300 dark:bg-slate-700"></div>

            {/* Author and Links */}
            <div className="flex flex-col items-center space-y-3">
              <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">
                Made with ❤️ by Muhammad Haseeb Amjad
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                <a
                  href="https://muhammadhaseebamjad-portfolio.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                  Portfolio
                </a>

                <span className="text-slate-300 dark:text-slate-700">•</span>

                <a
                  href="https://www.linkedin.com/in/muhammadhaseebamjad417"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  LinkedIn
                </a>

                <span className="text-slate-300 dark:text-slate-700">•</span>

                <a
                  href="https://github.com/muhammadhaseeb417/qr-code-creator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </a>
              </div>
            </div>

            {/* Copyright */}
            <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">
              © {new Date().getFullYear()} QR Studio. Open Source under MIT
              License.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default QRCodeCreator;

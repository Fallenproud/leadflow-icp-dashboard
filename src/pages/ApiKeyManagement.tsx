
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Copy, Eye, EyeOff, Key, Plus, RefreshCw, Trash } from "lucide-react";
import DashboardContainer from "@/components/layout/DashboardContainer";
import FormInput from "@/components/ui/FormInput";
import { toast } from "sonner";

interface ApiKey {
  id: string;
  name: string;
  key: string;
  created: Date;
  lastUsed: Date | null;
}

const ApiKeyManagement: React.FC = () => {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [newKeyName, setNewKeyName] = useState("");
  const [showKeyId, setShowKeyId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    // Load API keys from localStorage on component mount
    const savedKeys = localStorage.getItem("apiKeys");
    if (savedKeys) {
      try {
        // Parse the saved keys, ensuring dates are properly converted back from strings
        const parsedKeys = JSON.parse(savedKeys, (key, value) => {
          if (key === "created" || key === "lastUsed") {
            return value ? new Date(value) : null;
          }
          return value;
        });
        setApiKeys(parsedKeys);
      } catch (error) {
        console.error("Error parsing saved API keys:", error);
        toast.error("Failed to load saved API keys");
      }
    }
  }, []);

  // Save keys to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("apiKeys", JSON.stringify(apiKeys));
  }, [apiKeys]);

  const generateApiKey = () => {
    if (!newKeyName.trim()) {
      toast.error("Please enter a name for your API key");
      return;
    }

    setIsGenerating(true);

    // Simulate API call delay
    setTimeout(() => {
      // Generate a random key (in production this would be done server-side)
      const keyChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let apiKey = "live_";
      for (let i = 0; i < 32; i++) {
        apiKey += keyChars.charAt(Math.floor(Math.random() * keyChars.length));
      }

      const newKey: ApiKey = {
        id: crypto.randomUUID(),
        name: newKeyName.trim(),
        key: apiKey,
        created: new Date(),
        lastUsed: null
      };

      setApiKeys(prevKeys => [...prevKeys, newKey]);
      setNewKeyName("");
      setShowKeyId(newKey.id);
      setIsGenerating(false);
      toast.success("API key generated successfully");
    }, 1000);
  };

  const regenerateApiKey = (id: string) => {
    setApiKeys(prevKeys => prevKeys.map(key => {
      if (key.id === id) {
        // Generate a new key
        const keyChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let apiKey = "live_";
        for (let i = 0; i < 32; i++) {
          apiKey += keyChars.charAt(Math.floor(Math.random() * keyChars.length));
        }
        
        return {
          ...key,
          key: apiKey,
          created: new Date()
        };
      }
      return key;
    }));
    
    setShowKeyId(id);
    toast.success("API key regenerated successfully");
  };

  const deleteApiKey = (id: string) => {
    if (window.confirm("Are you sure you want to delete this API key? This action cannot be undone.")) {
      setApiKeys(prevKeys => prevKeys.filter(key => key.id !== id));
      toast.success("API key deleted successfully");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast.success("API key copied to clipboard");
      })
      .catch(err => {
        console.error("Failed to copy: ", err);
        toast.error("Failed to copy API key");
      });
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "Never";
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-[#0A192F]">
      <div className="container mx-auto px-4 py-8">
        <Link to="/documentation" className="inline-flex items-center text-[#94A3B8] hover:text-white transition-colors mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span>Back to Documentation</span>
        </Link>

        <DashboardContainer title="API Key Management">
          <div className="bg-[#1B2A4A] border border-[#3A5380] rounded-lg p-6 mb-8 animate-fade-in">
            <div className="flex items-start mb-6">
              <div className="w-12 h-12 bg-[#243B67] rounded-full flex items-center justify-center mr-4">
                <Key className="w-6 h-6 text-[#2DD4BF]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">API Keys</h3>
                <p className="text-[#94A3B8] mt-2">Manage your API keys for secure access to our services</p>
              </div>
            </div>

            <div className="mt-8">
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="flex-1">
                  <FormInput
                    label="API Key Name"
                    placeholder="Enter a name for your API key"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    className="w-full bg-[#0A192F] text-white border border-[#3A5380] rounded-md p-2"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={generateApiKey}
                    disabled={isGenerating}
                    className="flex items-center justify-center gap-2 bg-[#2DD4BF] text-[#0A192F] px-4 py-2 rounded-md hover:bg-[#25C4B3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed h-[42px]"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        Generate API Key
                      </>
                    )}
                  </button>
                </div>
              </div>

              {apiKeys.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="text-left border-b border-[#3A5380]">
                        <th className="py-3 px-4 text-[#94A3B8] font-medium">Name</th>
                        <th className="py-3 px-4 text-[#94A3B8] font-medium">API Key</th>
                        <th className="py-3 px-4 text-[#94A3B8] font-medium">Created</th>
                        <th className="py-3 px-4 text-[#94A3B8] font-medium">Last Used</th>
                        <th className="py-3 px-4 text-[#94A3B8] font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {apiKeys.map((key) => (
                        <tr key={key.id} className="border-b border-[#3A5380] hover:bg-[#243B67]">
                          <td className="py-4 px-4 text-white">{key.name}</td>
                          <td className="py-4 px-4 text-white font-mono">
                            <div className="flex items-center gap-2">
                              {showKeyId === key.id ? (
                                <span className="text-sm">{key.key}</span>
                              ) : (
                                <span className="text-sm">••••••••••••••••••••••••••••••••</span>
                              )}
                              <button
                                onClick={() => setShowKeyId(showKeyId === key.id ? null : key.id)}
                                className="p-1 text-[#94A3B8] hover:text-white transition-colors"
                                title={showKeyId === key.id ? "Hide API key" : "Show API key"}
                              >
                                {showKeyId === key.id ? (
                                  <EyeOff className="w-4 h-4" />
                                ) : (
                                  <Eye className="w-4 h-4" />
                                )}
                              </button>
                              <button
                                onClick={() => copyToClipboard(key.key)}
                                className="p-1 text-[#94A3B8] hover:text-white transition-colors"
                                title="Copy API key"
                              >
                                <Copy className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-[#94A3B8]">{formatDate(key.created)}</td>
                          <td className="py-4 px-4 text-[#94A3B8]">{formatDate(key.lastUsed)}</td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => regenerateApiKey(key.id)}
                                className="p-1 text-[#94A3B8] hover:text-white transition-colors"
                                title="Regenerate API key"
                              >
                                <RefreshCw className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => deleteApiKey(key.id)}
                                className="p-1 text-[#94A3B8] hover:text-[#FF5A5F] transition-colors"
                                title="Delete API key"
                              >
                                <Trash className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 border border-dashed border-[#3A5380] rounded-lg">
                  <Key className="w-12 h-12 text-[#3A5380] mx-auto mb-4" />
                  <h4 className="text-white font-medium mb-2">No API Keys Found</h4>
                  <p className="text-[#94A3B8] mb-4">Generate your first API key to get started</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 p-6 bg-[#243B67] rounded-lg border border-[#3A5380] animate-fade-in">
            <h3 className="text-xl font-bold text-white mb-4">API Key Usage</h3>
            <p className="text-[#94A3B8] mb-6">Your API keys are used to authenticate requests to our API. Make sure to keep them secure and never share them publicly.</p>
            
            <div className="bg-[#1B2A4A] rounded-lg p-4 mb-6">
              <p className="text-white font-medium mb-2">Authentication Example</p>
              <pre className="bg-[#0A192F] p-3 rounded overflow-x-auto text-sm text-[#94A3B8] font-mono">
                {`# Using cURL
curl -X GET \\
  https://api.example.com/v1/leads \\
  -H "Authorization: Bearer YOUR_API_KEY"

# Using JavaScript
fetch('https://api.example.com/v1/leads', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
})`}
              </pre>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/docs/api-reference" className="flex items-center justify-center p-3 bg-[#2DD4BF] text-[#0A192F] rounded-md hover:bg-[#25C4B3] transition-colors font-medium">
                <span>View API Documentation</span>
              </Link>
              <Link to="/docs/developer-support" className="flex items-center justify-center p-3 bg-transparent text-white border border-[#3A5380] rounded-md hover:bg-[#1B2A4A] transition-colors font-medium">
                <span>Contact Developer Support</span>
              </Link>
            </div>
          </div>
        </DashboardContainer>
      </div>
    </div>
  );
};

export default ApiKeyManagement;

import { Copy, Check } from "lucide-react";
import { useState } from "react";

const DonateDiocese = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const accounts = [
    {
      id: "1",
      accountName: "Catholic Diocese of Osogbo",
      accountNumber: "1234567890",
      bankName: "Access Bank Nigeria",
    },
    {
      id: "2",
      accountName: "Diocesan Development Fund",
      accountNumber: "0987654321",
      bankName: "GTBank Nigeria",
    },
  ];

  const handleCopy = (accountNumber: string, accountId: string) => {
    navigator.clipboard.writeText(accountNumber);
    setCopied(accountId);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section className="py-20 px-6 md:px-16 lg:px-24 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-black mb-4">
            Support the Diocese
          </h2>
          <p className="text-gray-700 text-lg max-w-2xl">
            Your generous donations help sustain pastoral care, formation,
            education, charity, and ongoing diocesan projects across Osogbo.
          </p>
        </div>

        {/* Main layout: Image on left, Account details on right */}
        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {/* Left: Image */}
          <div className="rounded-xl overflow-hidden shadow-lg h-full min-h-[500px]">
            <img
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80"
              alt="Diocesan outreach and charity"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right: Bank Account Details */}
          <div className="flex flex-col justify-between">
            <div className="space-y-6">
              {accounts.map((account) => (
                <div
                  key={account.id}
                  className="bg-gray-50 border-2 border-gray-200 rounded-xl p-8 hover:border-gray-300 hover:shadow-md transition-all duration-300"
                >
                  {/* Account Name */}
                  <div className="mb-6">
                    <p className="text-gray-600 text-xs font-semibold uppercase tracking-widest mb-1">
                      Account Name
                    </p>
                    <p className="text-xl font-serif font-bold text-black">
                      {account.accountName}
                    </p>
                  </div>

                  {/* Account Number */}
                  <div className="mb-6">
                    <p className="text-gray-600 text-xs font-semibold uppercase tracking-widest mb-2">
                      Account Number
                    </p>
                    <div className="flex items-center gap-3 bg-white border border-gray-300 rounded-lg p-3">
                      <code className="text-lg font-mono font-bold text-black flex-grow">
                        {account.accountNumber}
                      </code>
                      <button
                        onClick={() =>
                          handleCopy(account.accountNumber, account.id)
                        }
                        className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Copy account number"
                      >
                        {copied === account.id ? (
                          <Check size={18} className="text-green-600" />
                        ) : (
                          <Copy size={18} className="text-gray-700" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Bank Name */}
                  <div>
                    <p className="text-gray-600 text-xs font-semibold uppercase tracking-widest mb-1">
                      Bank Name
                    </p>
                    <p className="text-lg font-semibold text-black">
                      {account.bankName}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer message */}
            <div className="mt-10 p-6 bg-gray-100 rounded-lg border border-gray-200">
              <p className="text-gray-700 text-sm leading-relaxed">
                <span className="font-semibold text-black">
                  Thank you for your support.
                </span>{" "}
                Your donations are tax-deductible and help us continue our
                mission of faith, education, and service to the Catholic
                community.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonateDiocese;

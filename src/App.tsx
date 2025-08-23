function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-white text-center">
            Sabarish Nair
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">
            My First AI App
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Welcome to my personal website. I'm a Senior Product Manager with expertise in fintech, 
            payments, and blockchain technologies.
          </p>
          <div className="space-y-4">
            <p className="text-lg text-gray-400">
              Building internet-first fintech products across payments, lending, and blockchain.
            </p>
            <p className="text-lg text-gray-400">
              Currently working at Open.money as Senior Product Manager.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            &copy; 2024 Sabarish Nair. Built with React, TypeScript, and TailwindCSS.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream-white flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <h2 className="text-4xl font-bold text-midnight-green mb-4">404</h2>
        <p className="text-xl text-gray-600 mb-6">Page Not Found</p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-autophil-blue hover:bg-darker-blue text-white font-semibold rounded-lg transition-colors"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}

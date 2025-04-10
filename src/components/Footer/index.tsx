function Footer() {
  return (
    <footer className="bg-card border-t shadow">
      <div className="container mx-auto p-4 max-w-3xl">
        <p className="text-center text-sm text-gray-600">
          © {new Date().getFullYear()} All rights reserved.{' '}
        </p>
      </div>
    </footer>
  );
}

export default Footer;

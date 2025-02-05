import Image from "next/image";
import Link from "next/link"; // Import Link from Next.js

export default function Hero() {
  return (
    <>
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center py-16 px-5 bg-gray-50">
        {/* Left Side Text Content */}
        <div className="text-center md:text-left max-w-xl mb-8 md:mb-0">
          <h1 className="text-xl mb-6 text-gray-600">
            Welcome to Chairy.
          </h1>
          <h2 className="text-2xl md:text-5xl font-bold">Best Furniture Collection for your interior</h2>

          {/* Shop Now Button - Link to shop/ */}
          <Link href="/shop">
            <button className="bg-[#029FAE] py-2 px-5 rounded-[16px] mt-4 text-white">
              Shop Now
            </button>
          </Link>
        </div>

        {/* Right Side - Image */}
        <div className="relative w-full md:w-1/2 flex justify-center md:justify-end">
          <div className="relative w-[80%] md:w-[90%] lg:w-[80%] xl:w-[70%]">
            <Image
              src="/Product Image.png"
              alt="Chair Image"
              layout="responsive"
              width={500}
              height={300}
              objectFit="contain"
            />
          </div>
        </div>
      </section>

      {/* Logos Section */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
            <div className="flex justify-center">
              <Image
                src="/Logo (6).png"  // Replace with correct logo image path
                alt="Zapier Logo"
                width={120}
                height={40}
                objectFit="contain"
              />
            </div>
            <div className="flex justify-center">
              <Image
                src="/Logo (7).png"  // Replace with correct logo image path
                alt="Pipedrive Logo"
                width={120}
                height={40}
                objectFit="contain"
              />
            </div>
            <div className="flex justify-center">
              <Image
                src="/Logo (8).png"  // Replace with correct logo image path
                alt="CIB Bank Logo"
                width={120}
                height={40}
                objectFit="contain"
              />
            </div>
            <div className="flex justify-center">
              <Image
                src="/Logo (9).png"  // Replace with correct logo image path
                alt="Z Logo"
                width={120}
                height={40}
                objectFit="contain"
              />
            </div>
            <div className="flex justify-center">
              <Image
                src="/Logo (10).png"  // Replace with correct logo image path
                alt="pd Logo"
                width={120}
                height={40}
                objectFit="contain"
              />
            </div>
            <div className="flex justify-center">
              <Image
                src="/Logo (11).png"  // Replace with correct logo image path
                alt="Mozo Logo"
                width={120}
                height={40}
                objectFit="contain"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import Link from 'next/link';

export default function GameCard({ name, href, type }) {
  // type: normal | local | special
  let styles = "";
  switch(type){
    case "normal":
      styles = "bg-blue-500 text-white hover:bg-blue-600";
      break;
    case "local":
      styles = "bg-blue-200 text-blue-900 hover:bg-blue-300";
      break;
    case "special":
      styles = "bg-white text-blue-600 hover:bg-blue-50 border border-blue-400";
      break;
    default:
      styles = "bg-gray-100";
  }

  return (
    <Link href={href}>
      <div className={`p-6 rounded-xl shadow-lg cursor-pointer flex items-center justify-center
        text-center font-semibold text-sm md:text-base ${styles} transition duration-300`}>
        {name}
      </div>
    </Link>
  );
}

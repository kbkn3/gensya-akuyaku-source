import { Twitter } from "../components/icons";

type ShareButtonProps = {
  title: string;
};

export const ShareButton = (props: ShareButtonProps) => {
  if (typeof window === "undefined") {
    return null;
  }
  return (
    <div className="flex items-center mb-4">
      {/* Share */}
      <a
        href={`https://twitter.com/share?url=${encodeURIComponent(
          window.location.href
        )}&text=${encodeURIComponent(
          props.title
        )}&via=kbkn3`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-black bg-secondary rounded-md hover:bg-accent !no-underline"
      >
        <Twitter size={24} color="#000000" />
        Share
      </a>
    </div>
  );
};

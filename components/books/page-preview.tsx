import { TextStyle, BookPage } from "./data/books-data";

interface PagePreviewProps {
  page: BookPage;
}

export default function PagePreview({ page }: PagePreviewProps) {
  return (
    <div className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden border-2 border-azalove-200 shadow-lg">
      <img
        src={page.imageUrl}
        alt={page.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent">
        <div className="absolute top-0 left-0 right-0 p-6 text-white">
          <h2
            className="font-bold mb-2"
            style={{
              color: page.titleStyle.color,
              fontFamily: page.titleStyle.fontFamily,
              fontSize: `${page.titleStyle.fontSize}px`,
              textAlign: page.titleStyle.textAlign,
            }}
          >
            {page.title}
          </h2>
          {page.subtitle && (
            <p
              className="opacity-90 mb-2"
              style={{
                color: page.subtitleStyle.color,
                fontFamily: page.subtitleStyle.fontFamily,
                fontSize: `${page.subtitleStyle.fontSize}px`,
                textAlign: page.subtitleStyle.textAlign,
              }}
            >
              {page.subtitle}
            </p>
          )}
          {page.description && (
            <p
              className="opacity-75 line-clamp-2"
              style={{
                color: page.descriptionStyle.color,
                fontFamily: page.descriptionStyle.fontFamily,
                fontSize: `${page.descriptionStyle.fontSize}px`,
                textAlign: page.descriptionStyle.textAlign,
              }}
            >
              {page.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

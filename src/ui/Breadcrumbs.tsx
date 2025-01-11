import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment, useState } from "react";

export function Breadcrumbs() {
  const [currentPath, setCurrentPath] = useState(["Home", "Documents"]);

  const handlePathClick = (index: number) => {
    setCurrentPath((prev) => prev.slice(0, index + 1));
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {currentPath.map((item, index) => (
          <Fragment key={index}>
            {index === currentPath.length - 1 ? (
              <BreadcrumbPage>{item}</BreadcrumbPage>
            ) : (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink onClick={() => handlePathClick(index)}>
                    {item}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

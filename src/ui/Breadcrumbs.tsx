import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";
import { useFileSystem } from "@/core/fileSystem/useFileSystem";

export function Breadcrumbs() {
  const { currentPath, navigateTo } = useFileSystem();
  const pathSegments = ["Home", ...currentPath.split("/").filter(Boolean)];

  const handlePathClick = (index: number) => {
    if (index === 0) {
      navigateTo("/");
      return;
    }

    navigateTo(pathSegments.slice(1, index + 1).join("/"));
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathSegments.map((item, index) => (
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

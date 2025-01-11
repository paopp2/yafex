import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useFileSystem } from "@/core/fileSystem/useFileSystem";
import { Fragment } from "react/jsx-runtime";

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
        {pathSegments.map((segment, index) => (
          <Fragment key={segment}>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => handlePathClick(index)}>
                {segment}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

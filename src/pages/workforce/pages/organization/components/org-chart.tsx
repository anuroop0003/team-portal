import Tree from "react-d3-tree";
import { useRef, useEffect } from "react";
import { OrgNode } from "./org-node";
import { MOCK_ORG_DATA } from "../../../constants";

interface OrgChartProps {
  zoom: number;
  translate: { x: number; y: number };
  onTranslateChange: (translate: { x: number; y: number }) => void;
  onZoomChange: (zoom: number) => void;
}

export function OrgChart({
  zoom,
  translate,
  onTranslateChange,
  onZoomChange,
}: OrgChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && translate.x === 0 && translate.y === 0) {
      const { width } = containerRef.current.getBoundingClientRect();
      onTranslateChange({ x: width / 2, y: 100 });
    }
  }, [onTranslateChange, translate.x, translate.y]);

  return (
    <div
      ref={containerRef}
      className="h-[400px] w-full relative overflow-hidden"
    >
      <Tree
        data={MOCK_ORG_DATA}
        orientation="vertical"
        translate={translate}
        zoom={zoom}
        pathFunc="step"
        renderCustomNodeElement={(rd3tProps) => (
          <OrgNode
            nodeDatum={rd3tProps.nodeDatum}
            toggleNode={rd3tProps.toggleNode}
          />
        )}
        separation={{ siblings: 1.8, nonSiblings: 2.2 }}
        nodeSize={{ x: 280, y: 200 }}
        draggable={true}
        zoomable={true}
        onUpdate={(state: any) => {
          onTranslateChange(state.translate);
          onZoomChange(state.zoom);
        }}
        scaleExtent={{ min: 0.1, max: 2 }}
        rootNodeClassName="node__root"
        branchNodeClassName="node__branch"
        leafNodeClassName="node__leaf"
        pathClassFunc={() => "rd3t-link"}
      />
    </div>
  );
}

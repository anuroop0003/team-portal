import Tree, { type TreeNodeDatum } from "react-d3-tree";
import type { HierarchyPointNode } from "d3-hierarchy";
import { useRef, useEffect, useState, useCallback } from "react";
import { OrgNode } from "./org-node";
import { MOCK_ORG_DATA } from "../../../constants";
import { OrgControls } from "./org-controls";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function OrgChart() {
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>();
  const [translate, setTranslate] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [zoom, setZoom] = useState<number>(1);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.1, 0.2));

  const handleRecenter = useCallback(() => {
    setTranslate({ x: 0, y: 0 });
    setZoom(1);
  }, []);

  const onTranslateChange = useCallback(
    (newTranslate: { x: number; y: number }) => {
      setTranslate(newTranslate);
    },
    [],
  );

  const onZoomChange = useCallback((newZoom: number) => {
    setZoom(newZoom);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleNodeClick = (node: HierarchyPointNode<TreeNodeDatum>) => {
    if (dimensions) {
      setTranslate({
        x: dimensions.width / 2 - node.x * zoom,
        y: dimensions.height / 2 - node.y * zoom,
      });
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
      if (translate.x === 0 && translate.y === 0) {
        setTranslate({ x: width / 2, y: 100 });
      }
    }
  }, []);

  return (
    <Card className="h-[calc(100vh-240px)] rounded-lg overflow-hidden">
      <CardHeader>
        <OrgControls
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onRecenter={handleRecenter}
        />
      </CardHeader>
      <CardContent className="relative w-full h-full" ref={containerRef}>
        <Tree
          data={MOCK_ORG_DATA}
          orientation="vertical"
          translate={translate}
          zoom={zoom}
          dimensions={dimensions}
          pathFunc="step"
          renderCustomNodeElement={(rd3tProps) => (
            <OrgNode
              nodeDatum={rd3tProps.nodeDatum}
              toggleNode={rd3tProps.toggleNode}
              hierarchyPointNode={rd3tProps.hierarchyPointNode}
              onNodeClick={handleNodeClick}
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
      </CardContent>
    </Card>
  );
}

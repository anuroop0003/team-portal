import Tree, { type Point, type TreeNodeDatum } from "react-d3-tree";
import type { HierarchyPointNode } from "d3-hierarchy";
import { useRef, useEffect, useState, useCallback } from "react";
import { OrgNode } from "./org-node";
import { MOCK_ORG_DATA } from "../../constants";
import { OrgControls } from "./org-controls";
import { Card, CardContent } from "@/components/ui/card";

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

  const transformRef = useRef<{
    translate: { x: number; y: number };
    zoom: number;
  }>({
    translate: { x: 0, y: 0 },
    zoom: 1,
  });

  const handleZoomIn = () => {
    const nextZoom = Math.min(transformRef.current.zoom + 0.1, 2);
    setTranslate(transformRef.current.translate);
    setZoom(nextZoom);
  };

  const handleZoomOut = () => {
    const nextZoom = Math.max(transformRef.current.zoom - 0.1, 0.2);
    setTranslate(transformRef.current.translate);
    setZoom(nextZoom);
  };

  const handleRecenter = useCallback(() => {
    if (dimensions) {
      const initialTranslate = { x: dimensions.width / 2, y: 100 };
      setTranslate(initialTranslate);
      setZoom(1);
      transformRef.current = {
        translate: initialTranslate,
        zoom: 1,
      };
    }
  }, [dimensions]);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleNodeClick = (node: HierarchyPointNode<TreeNodeDatum>) => {
    if (dimensions) {
      const targetTranslate = {
        x: dimensions.width / 2 - node.x * transformRef.current.zoom,
        y: dimensions.height / 2 - node.y * transformRef.current.zoom,
      };
      setTranslate(targetTranslate);
      setZoom(transformRef.current.zoom);
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
      const initialTranslate = { x: width / 2, y: 100 };
      setTranslate(initialTranslate);
      transformRef.current = {
        translate: initialTranslate,
        zoom: 1,
      };
    }
  }, []);

  return (
    <Card className="p-0 h-[calc(100vh-240px)] rounded-lg overflow-hidden relative">
      <CardContent className="relative w-full h-full p-0" ref={containerRef}>
        <OrgControls
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onRecenter={handleRecenter}
        />
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
          separation={{ siblings: 1.1, nonSiblings: 1.3 }}
          nodeSize={{ x: 280, y: 140 }}
          draggable={true}
          zoomable={true}
          onUpdate={(state: { translate: Point; zoom: number }) => {
            transformRef.current = {
              translate: state.translate,
              zoom: state.zoom,
            };
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

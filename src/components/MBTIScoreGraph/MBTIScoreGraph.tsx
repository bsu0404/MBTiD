import React from "react";
import { getMBTIColor } from "@/utils/getMbtiColor";
import { MbtiScoreProps } from "@/types/mbti";
import { getMBTIScoreArray } from "@/utils/getMbtiScoreArray";
import { MBTIScoreDataType } from "@/utils/types";
import "./mbtiscoregraph.scss";

const GraphItem = ({
  data,
  color,
}: {
  data: MBTIScoreDataType;
  color: string;
}) => {
  return (
    <div className="graph-item">
      <div className="graph-char f-caption">{data.char}</div>
      <div className="graph-bar">
        <div
          className="graph-bar-progress"
          style={{ width: `${data.score}%`, background: color }}
        ></div>
      </div>
      <p className="graph-score f-caption">{`${Math.trunc(data.score)}%`}</p>
    </div>
  );
};
const MBTIScoreGraph = ({ mbti, ei, sn, tf, jp }: MbtiScoreProps) => {
  const scoreData = getMBTIScoreArray({ mbti, ei, sn, tf, jp });
  return (
    <div className="mbti-score-graph-container">
      {scoreData.map((d, idx) => (
        <GraphItem key={idx} data={d} color={getMBTIColor(mbti)} />
      ))}
    </div>
  );
};

export default React.memo(MBTIScoreGraph);

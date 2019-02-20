import * as React from "react";
import "./levelMeter.css";

export interface LevelMeterProps {
  active?: boolean;
  progress: number;
}

export class LevelMeter extends React.Component<LevelMeterProps> {
  render() {
    let height = Math.round((this.props.progress || 0) * 100) + "%",
      wrapClass = "level-meter " + (this.props.active ? "active" : "");
    return (
      <div className={wrapClass}>
        <div className="level-meter-wrap">
          <div className="level-meter-content" style={{ height: height }} />
        </div>
        <span className="level-meter-label">
          {this.props.progress.toFixed(2).substr(2)}
        </span>
      </div>
    );
  }
}

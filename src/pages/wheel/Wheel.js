import React, { Component } from 'react';

class Wheel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinning: false,
      selectedPrize: null,
    };
    this.prizes = [
      '奖品1',
      '奖品2',
      '奖品3',
      '奖品4',
      '奖品5',
      '奖品6',
      '奖品7',
      '奖品8',
      '奖品9',
      '奖品10',
    ];
  }

  startSpinning = () => {
    if (!this.state.spinning) {
      const selectedPrize =
        this.prizes[Math.floor(Math.random() * this.prizes.length)];

      this.setState({ spinning: true });

      setTimeout(() => {
        this.setState({ selectedPrize, spinning: false });
      }, 5000); // 模拟5秒内的旋转动画
    }
  };

  render() {
    const { spinning, selectedPrize } = this.state;

    return (
      <div>
        <div className={`wheel ${spinning ? 'spinning' : ''}`}>
          <div className="wheel-container">
            {this.prizes.map((prize, index) => (
              <div key={index} className={`wheel-segment segment-${index}`}>
                {prize}
              </div>
            ))}
          </div>
          <div className="pointer" onClick={this.startSpinning}>
            点击抽奖
          </div>
        </div>
        <div className="prize">
          {selectedPrize && <p>恭喜您获得：{selectedPrize}</p>}
        </div>
      </div>
    );
  }
}

export default Wheel;

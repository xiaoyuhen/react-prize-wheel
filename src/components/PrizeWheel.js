import PropTypes from 'prop-types'
import React, {
  Component
} from 'react'
import circle from '../assets/circle.png'
import randomArray from '../utils/randomArray'
import './PrizeWheel.css'

const NUMBER = 40
const CANVAS_WIDTH = 580
const OUTSIDE_BORDER_WIDTH = 572
const INSIDE_BORDER_WIDTH = 208
const PRIZE_WHEEL_IMAGE_WIDTH = 248
let flag = 0
const MAGIC_NUMBER = 6

class PrizeWheel extends Component {
  // static propTypes = {
  //   prizeNumberList: PropTypes.array,
  //   slots: PropTypes.number,
  //   sort: PropTypes.oneOf(['normal', 'random']),
  // }

  // static defaultProps = {
  //   slots: 3,
  //   sort: 'normal',
  // }

  constructor(...props) {
    super(...props)
    this.drawPrizeWheel = this.drawPrizeWheel.bind(this)
    this.drawArrow = this.drawArrow.bind(this)

    this.state = {
      angle: 0,
    }
  }

  componentDidMount() {
    const {
      slots,
      sort
    } = this.props
    let magicNumberList
    if (sort === 'normal') {
      magicNumberList = Array.from(new Array(slots), (val, index) => index + 1)
    } else {
      magicNumberList = randomArray(slots)
    }
    console.log(sort)

    this.drawPrizeWheel(magicNumberList)
  }

  drawPrizeWheel(magicNumberList) {
    const canvas = this.prizeWheel
    if (canvas.getContext) {
      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_WIDTH)
      for (let index = 0; index < NUMBER; index++) {
        // 绘制轮盘部分
        // 用户选择的数字为黄色，单数为蓝色，双数为绿色
        if (magicNumberList.includes(index + 1)) {
          // 黄色
          ctx.fillStyle = '#DE8600'
        } else if (index % 2 === 0) {
          // 蓝色
          ctx.fillStyle = '#1c2232'
        } else {
          // 绿色
          ctx.fillStyle = '#004f36'
        }
        ctx.beginPath()
        // 顺序时，1的位置需要偏移一些
        const startAngle = -(Math.PI / 2) - (Math.PI / 20)
        const arc = Math.PI / (NUMBER / (NUMBER / (NUMBER / 2)))
        const angle = startAngle + index * arc
        ctx.arc(CANVAS_WIDTH / 2, CANVAS_WIDTH / 2, OUTSIDE_BORDER_WIDTH / 2, angle, angle + arc, false)
        ctx.arc(CANVAS_WIDTH / 2, CANVAS_WIDTH / 2, INSIDE_BORDER_WIDTH / 2, angle + arc, angle, true)
        ctx.stroke()
        ctx.closePath()
        ctx.fill()
        ctx.save()

        // 绘制轮盘数字部分
        ctx.shadowOffsetX = -1
        ctx.shadowOffsetY = -1
        ctx.shadowBlur = 0
        ctx.fillStyle = "white"
        ctx.translate((CANVAS_WIDTH / 2) + Math.cos(angle + arc / 2) * (OUTSIDE_BORDER_WIDTH / 2), (CANVAS_WIDTH / 2) + Math.sin(angle + arc / 2) * OUTSIDE_BORDER_WIDTH / 2)
        ctx.rotate(angle + arc / 2 + Math.PI / 2)
        const text = index + 1
        ctx.font = "22px PingFangSC"
        ctx.fillText(text, -ctx.measureText(text).width / 2, 30)
        ctx.restore()
      }


      // 必须等图片加载完才能绘制
      const imgNode = this.circleNode
      if (flag) {
        this.drawArrow()
      } else {
        imgNode.addEventListener("load", () => {
          this.drawArrow()
        })
        flag += 1
      }
    }
  }

  // 绘制转盘中间部分
  drawArrow() {
    const imgNode = this.circleNode
    const canvas = this.prizeWheel
    const ctx = canvas.getContext('2d')
    const {
      angle
    } = this.state

    ctx.save()
    const magicNumber = 165
    ctx.translate(magicNumber + PRIZE_WHEEL_IMAGE_WIDTH / 2, magicNumber + PRIZE_WHEEL_IMAGE_WIDTH / 2)
    // 需要偏移4°才能保证箭头位于区域中间
    const magicAngle = -4
    ctx.rotate((magicAngle + angle) * Math.PI / 180)
    ctx.drawImage(imgNode, -PRIZE_WHEEL_IMAGE_WIDTH / 2, -PRIZE_WHEEL_IMAGE_WIDTH / 2, PRIZE_WHEEL_IMAGE_WIDTH, PRIZE_WHEEL_IMAGE_WIDTH)
    ctx.restore()
  }

  rotate(magicNumberList) {
    this.spinTimeout = setInterval(() => {
      // 分成 40 个格子，每个格子占 9°
      const {
        angle
      } = this.state
      const newAngle = angle + 9
      this.this.setState({
        angle: newAngle
      })
      this.drawPrizeWheel(magicNumberList)
      if (this.prizeNumber - 1 === ((newAngle % 360 / 9 + MAGIC_NUMBER - 1) % 40)) {
        clearInterval(this.spinTimeout)
        this.callback()
      }
    }, 10)
  }

  render() {
    return (
      <div className = "PrizeWheel-wrapper">
        <canvas
          className = "PrizeWheel"
          width = "580"
          height = "580"
          ref = {
            node => {
              this.prizeWheel = node
            }
          }
        />
        <img
          className = "PrizeWheel-circle"
          src = {circle}
          ref = {
            node => {
              this.circleNode = node
            }
          }
          width = '200'
          height = '200'
        />
      </div>
    )
  }
}

PrizeWheel.defaultProps = {
  slots: 3,
  sort: 'normal',
}

export default PrizeWheel
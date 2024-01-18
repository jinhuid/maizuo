import img1 from '@/assets/座位图标_可选择座位.png'
import img2 from '@/assets/座位锁定.png'
import img3 from '@/assets/座位图标_已售座位.png'
import img4 from '@/assets/座位图标_已选择座位.png'

export default {
  functional: true,
  render(h, { props }) {
    const getSeatIcon = (item) =>
      item.isBroken ? img2 :
        item.isOccupied ? img3 :
          item.isChoose ? img4 :
            img1

    const { item, index, seatInterval, size } = props

    return h(
      'img',
      {
        style: {
          position: 'absolute',
          left: `${size * (+item.columnNum + seatInterval / 2 - 1)}px`,
          top: `${size * (+item.rowNum - 1)}px`,
          width: size + 'px',
          height: size + 'px',
          transition: 'all 0.5s cubic-bezier(1, 0, 0, 1)',
          padding: '1px',
          'touch-action': 'none'
        },
        attrs: {
          src: getSeatIcon(item),
          'data-index': index
        }
      }
    )
  }
}
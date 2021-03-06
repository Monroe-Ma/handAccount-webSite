import React, { useState } from 'react'
import { Wrapper } from './NumberSeaction/NumberSection'
import Caculate from './NumberSeaction/Caculate'
type Props = {
  value: number
  onChange: (value: number) => void
  onOk?: () => void
}
const NumberSecation: React.FC<Props> = (props) => {
  const [output, _setOutput] = useState(props.value.toString())
  const setOutput = (output: string) => {
    let newOutput: string
    if (output.length > 16) {
      newOutput = output.slice(0, 16)
    } else if (output.length === 0) {
      newOutput = '0'
    } else {
      newOutput = output
    }
    // console.log(parseInt(newOutput));
    _setOutput(newOutput)
    props.onChange(Number(newOutput))
  }
  const padWrapper = (e: React.MouseEvent) => {
    const text = (e.target as HTMLButtonElement).textContent
    if (text === null) {
      return
    }
    if (text === '') {
      return
    }
    if (text === '保存') {
      if (props.onOk) {
        props.onOk()
      }
      return
    }

    setOutput(Caculate(text, output) || '')
  }

  return (
    <Wrapper>
      <div className="pad clearfix" onClick={padWrapper}>
        <button className="a">1</button>
        <button className="b">2</button>
        <button className="c">3</button>
        <button className="d">删除</button>
        <button className="e">4</button>
        <button className="f"> 5</button>
        <button className="g">6</button>
        <button className="h">清空</button>
        <button className="i">7</button>
        <button className="j">8</button>
        <button className="k">9</button>
        {/* <button className="l"  id="save" style={{ height: zeroHeight * 2 + 4 + 'px' }}></button> */}
        <button className="l">保存</button>
        {/* <button id="zero">0</button> */}
        <button className="m">0</button>
        <button className="n">.</button>
      </div>
    </Wrapper>
  )
}
export default NumberSecation

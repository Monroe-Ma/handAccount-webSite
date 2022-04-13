import React, { useState } from 'react'
import styled from 'styled-components'
import Icon from '../../component/Icon'
import { useRecords, RecordsItem } from 'hook/useRecords'
import useTag from 'hook/useTag'
import day from 'dayjs'
import Category from './Category'
import px2vw from '../../lib/px2vw'
const Preparation = styled.div`
  margin: 18px 10px;
  display: flex;
  justify-content: center;
`
const Bill = styled.ul`
  background: #fff;
  > li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eee;
    margin: 0 10px;
    padding: 8px 0;
    .listName {
      display: flex;
      align-items: center;

      > .iconBg {
        background: #fff2e9;
        width: 26px;
        height: 26px;
        border-radius: 13px;
        display: flex;
        align-items: center;
        justify-content: center;
        .icon {
          fill: #ff9400;
        }
      }
      > p {
        font-size: 15px;
        display: flex;
        flex-direction: column;
        margin-left: 7px;
        .showRow {
          display: flex;
          flex-direction: row;
          > span {
            font-size: 12px;
            color: #999;
            display: inline-block;
            line-height: 22px;
          }
        }
      }
    }
    .account {
      font-weight: 600;
    }
  }
`
type categoryType = '+' | '-' | 'o'
const Monthly = () => {
  const { getIconName, getTagName } = useTag()
  const { records } = useRecords()
  const [category, setCategory] = useState<categoryType>('o')
  const onChange = (category: categoryType) => {
    setCategory(category)
  }
  const selectCategory = records.filter((r) => {
    if (category === '+' || category === '-') {
      return r.classification === category
    } else {
      return r
    }
  })
  const hash: { [K: string]: RecordsItem[] } = {}
  selectCategory.forEach((r) => {
    const key = day(r.createdAt).format('MM月DD日')
    if (!(key in hash)) {
      hash[key] = []
    }
    hash[key].push(r)
  })
  const array = Object.entries(hash).sort((a, b) => {
    if (a[0] === b[0]) return 0
    if (a[0] > b[0]) return -1
    if (a[0] < b[0]) return 1
    return 0
  })

  const DateHeader = styled.h4`
    padding: 10px;
    background-color: #f4f4f4;
  `
  const NoRecords = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    margin-top: ${px2vw(200)};
    color: #999;
    .icon {
      width: 84px;
      height: 84px;
      fill: #999;
      margin-bottom: 12px;
    }
  `

  return (
    <div>
      <Preparation>
        <Category
          value={category}
          onChange={(category: '+' | '-' | 'o') => onChange(category)}
        />
      </Preparation>

      {records.length === 0 ? (
        <NoRecords>
          <Icon name="noRecords" />
          <p>暂无记录</p>
        </NoRecords>
      ) : (
        array.map(([time, records], i) => (
          <div key={i}>
            <DateHeader>{time}</DateHeader>
            <Bill>
              {records.map((r, index) => {
                return (
                  <li key={index}>
                    <div className="listName">
                      <span className="iconBg">
                        <Icon
                          name={
                            r.tagIds.map((tagIds) => getIconName(tagIds))[0]
                          }
                        />
                      </span>
                      <p>
                        {r.tagIds.map((tagIds) => getTagName(tagIds))[0]}
                        <span className="showRow">
                          <span>{day(r.createdAt).format('HH:mm:ss')} </span>
                          <span> | {r.note}</span>
                        </span>
                      </p>
                    </div>
                    <div className="account">
                      {r.classification} {r.outputVal}
                    </div>
                  </li>
                )
              })}
            </Bill>
          </div>
        ))
      )}
    </div>
  )
}
export { Monthly }

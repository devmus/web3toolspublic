import { useEffect, useState } from 'react';
import { RewardForm } from '../../components/Assetdash/RewardForm';
import { RewardList } from '../../components/Assetdash/RewardList';
import { IconEdit } from '@tabler/icons-react';

export const SwapRewards = () => {

  const [tierList, setTierList] = useState("tier0");
  const [refresh, setRefresh] = useState(0);
  const [boostElem, setBoostElem] = useState(0);
  const [boostPack, setBoostPack] = useState(0);
  const [boost, setBoost] = useState(0);
  const [changeBoost, setChangeBoost] = useState(false);

  useEffect(() => {
    const tier = localStorage.getItem("tier")
    const boosterElem = localStorage.getItem("boosterElem")
    const boosterPack = localStorage.getItem("boosterPack")

    let booster;

    if(tier){
      setTierList(tier)
    }
    if(boosterElem > 0){
      setBoostElem(boosterElem)
      booster = boosterElem
    }
    if(boosterPack > 1){
      setBoostPack(boosterPack)
      booster = (1 + boosterElem) * (1 + boosterPack) / 100
    }

    setBoost(booster)
  }, [])

  const changeTier = (e) => {
    const selectedTier = e.target.value;
    setTierList(selectedTier);
    localStorage.setItem("tier", selectedTier);
  }

  const handleEditBoost = (e) => {
    e.preventDefault();
    setChangeBoost(prev => !prev)
  }

  const handleChangeBoost = (e) => {
    e.preventDefault();
    setChangeBoost(prev => !prev)
  }

  return (
    <div className="swaprewards-wrapper">
      <div className="tier-list">
        <select onChange={changeTier} value={tierList}>
          <option value="tier0">Tier</option>
          <option value="tier1">6 $</option>
          <option value="tier2">11 $</option>
          <option value="tier3">31 $</option>
          <option value="tier4">51 $</option>
          <option value="tier5">101 $ (Fee 0.5$)</option>
          <option value="tier6">201 $</option>
          <option value="tier7">503 $ (Fee 2.4$)</option>
          <option value="tier8">1010 $ (Fee 5$)</option>
        </select>
      </div>
      <div className="boost-wrapper">
        <div className="element-boost">{changeBoost ? <><input onChange={(e) => {setBoostElem(e.target.value), localStorage.setItem("boosterElem", e.target.value)}}></input><input onChange={(e) => {setBoostPack(e.target.value), localStorage.setItem("boosterPack", e.target.value)}}></input><button onClick={handleChangeBoost}>Apply</button></>: <span className="boost-display">Boost: ${boostElem} % + ${boostPack}  %</span>}</div>

        <button className="edit-token2" onClick={(e) => handleEditBoost(e)}><IconEdit/></button>
      </div>
      <div className="form-wrapper floating-wrapper">
        <RewardForm tierList={tierList} setRefresh={setRefresh} refresh={refresh}/>
      </div>
      <div className="reward-list-wrapper">
        <RewardList tierList={tierList} refresh={refresh} boost={boost}/>
      </div>
      <div>
        <span></span>
      </div>
    </div>
  )
}
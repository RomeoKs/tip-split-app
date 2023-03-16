import React, { useState, useEffect } from 'react';
import './App.scss';
import classNames from "classnames";
import { Header } from './components/Header';


function App() {
  const [data, setData] = useState({
    bill: 0,
    customTip: 0,
    persons: 0
  });

  const [placeholder, setPlaceHolder] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);
  const [activeButtonIndex, setActiveButtonIndex] = useState(null);
  const [tip, setTip] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const hasZeroValue = Object.values(data).some((value) => value !== 0);
    setIsDisabled(hasZeroValue);
  }, [data]);

  const Reset = () => {
    setPlaceHolder(0);
    setData({
      bill: 0,
      customTip: 0,
      persons: 0
    });
    setIsDisabled(true);
  };

  const handleInputChange = (event) => {
    const { value, name } = event.target;

    setData((previousValue) => {
      return {
        ...previousValue,
        [name]: value,
      };
    });
  };

  const tipCalculator = (inputTip) => {
    if (data.persons > 0) {
      let totalPerPerson = (data.bill * (inputTip / 100)) / data.persons;
      totalPerPerson = totalPerPerson.toFixed(2);
      let totalAmount = (data.bill / data.persons) + Number(totalPerPerson);
      totalAmount = totalAmount.toFixed(2);
      setTip(totalPerPerson);
      setTotal(totalAmount);
    }
  };

  const handleClickBtn = (tipButtonValue, index) => {
    tipCalculator(tipButtonValue);
    setActiveButtonIndex(index);
  };
  const tipButtonsValues = [5, 10, 15, 25, 50];

  return (

    <div className="page page__body">
      <Header />
      <main>
        <div className="page__section amount">
          <div className="container">
            <div className="amount__in">
              <div className="input__container">
                <div className="error__container">

                  <label
                    htmlFor="bill"
                    className="input__label"
                  >
                    Bill
                  </label>
                  {!data.bill &&
                    <span className="input__label-error">Can&apos;t be zero</span>
                  }
                </div>
                <input
                  className="input__data input__data-bill"
                  type="number"
                  name="bill"
                  id="bill"
                  placeholder={placeholder}
                  inputMode="decimal"
                  value={data.bill}
                  required
                  onChange={handleInputChange}
                  invalid={data.bill}
                />
              </div>
              <div className="input__container">
                <div className="input__label input__label-select">Select Tip %</div>
                <div className="buttons-container">
                  {tipButtonsValues.map((tipButtonValue, index) => (
                    <button
                      className={classNames('button', 'button__amount', {
                        "button__amount-active": index === activeButtonIndex,
                      })}
                      key={index}
                      value={tipButtonValue}
                      onClick={() => handleClickBtn(tipButtonsValues[index], index)}
                    >
                      {tipButtonValue}%
                    </button>
                  ))}
                  <input
                    type="number"
                    name='customTip'
                    placeholder="Custom"
                    inputMode="decimal"
                    className="input__data input__data-custom"
                    value={data.customTip}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="input__container">
                <div className="error__container">
                  <label
                    htmlFor="persons"
                    className="input__label"
                  >
                    Number of People
                  </label>
                  {!data.persons &&
                    <span className="input__label-error">Can&apos;t be zero</span>
                  }
                </div>
                <input
                  type="number"
                  name="persons"
                  id="num_people"
                  placeholder={placeholder}
                  required
                  className="input__data input__data-persons"
                  value={data.persons}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="amount__out">
              <div className="amount__out-container">
                <div className="amount__info-container">
                  <div className="amount__info ">
                    <div className="amount__info-title">Tip Amount</div>
                    <div className="amount__info-person">/ person</div>
                  </div>
                  <div className="amount__info-perPerson">${tip}</div>
                </div>
                <div className="amount__info-container">
                  <div className="amount__info ">
                    <div className="amount__info-title">Total</div>
                    <div className="amount__info-person">/ person</div>
                  </div>
                  <div className="amount__info-total">${total}</div>
                </div>
              </div>
              <button
                className="button button__reset"
                disabled={!isDisabled}
                onClick={() => Reset()}
              >
                Reset
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;
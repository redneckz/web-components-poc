import React, { useCallback, useState } from "react";
import { Button } from "./Button";
import { Checkbox } from "./Checkbox";
import { Dropdown, DropdownOption } from "./Dropdown";
import { Input } from "./Input";
import { reactWrapper } from "./utils/reactWrapper";

const RSHBInput = reactWrapper(Input);
const RSHBCheckbox = reactWrapper(Checkbox);
const RSHBDropdown = reactWrapper(Dropdown);
const RSHBDropdownOption = reactWrapper(DropdownOption);
const RSHBButton = reactWrapper(Button);

export default function App() {
  const [email, setEmail] = useState("user@mail.com");
  const [primary, setPrimary] = useState(true);
  const [count, setCount] = useState(1);

  const handleInputChange = useCallback((ev) => {
    console.log("InputEvent", ev.target.value);
    setEmail(ev.target.value);
  }, []);

  const handleCheckboxToggle = useCallback((ev) => {
    console.log("CheckboxEvent", ev);
    setPrimary((_) => !_);
  }, []);

  const handleSubmitClick = useCallback((ev) => {
    console.log("ClickEvent", ev);
    setPrimary((_) => !_);
  }, []);
  const handleSubmit = useCallback((ev) => {
    console.log("SubmitEvent", ev);
    ev.preventDefault();
  }, []);

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <label htmlFor="inputEmail" className="col-sm-2 col-form-label">
            Email #1
          </label>
          <div className="col-sm-10">
            <RSHBInput id="inputEmail" type="email" value={email} onChange={handleInputChange} />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputEmail2" className="col-sm-2 col-form-label">
            Email #2
          </label>
          <div className="col-sm-10">
            <RSHBInput id="inputEmail2" type="email" value={email} disabled />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-10 offset-sm-2">
            <RSHBCheckbox id="checkbox" checked={primary} onClick={handleCheckboxToggle}>
              <span slot="label">Checkbox slot is controlled by React "{email}"</span>
            </RSHBCheckbox>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-5 offset-sm-2">
            <RSHBDropdown id="dropdown1" name={`Count ${count}`}>
              <section slot="options">
                {new Array(5)
                  .fill(0)
                  .map((_, i) => 2 ** i)
                  .map((_) => (
                    <RSHBDropdownOption key={_} name={`Count ${_}`} onClick={() => setCount(_)} />
                  ))}
              </section>
            </RSHBDropdown>
          </div>
          <div className="col-sm-5">
            <RSHBDropdown id="dropdown2" name={`Select one of ${count} options`}>
              <section slot="options">
                {new Array(count).fill(0).map((_, i) => (
                  <RSHBDropdownOption key={i} name={`Option #${i}`} />
                ))}
              </section>
            </RSHBDropdown>
          </div>
        </div>
        <RSHBButton type="submit" primary={primary} onClick={handleSubmitClick}>
          <span slot="name">Toggle checkbox</span>
        </RSHBButton>
      </form>
    </div>
  );
}

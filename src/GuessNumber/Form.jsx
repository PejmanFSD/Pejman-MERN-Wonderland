export default function Form({
  handleSubmit,
  firstHandleChange,
  secondHandleChange,
  thirdHandleChange,
  fourthHandleChange,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="FirstDigit"></label>
      <input
        type="text"
        placeholder="First Digit"
        name="FirstDigit"
        id="FirstDigit"
        onChange={firstHandleChange}
      />
      <label htmlFor="SecondDigit"></label>
      <input
        type="text"
        placeholder="Second Digit"
        name="SecondDigit"
        id="SecondDigit"
        onChange={secondHandleChange}
      />
      <label htmlFor="ThirdDigit"></label>
      <input
        type="text"
        placeholder="Third Digit"
        name="ThirdDigit"
        id="ThirdDigit"
        onChange={thirdHandleChange}
      />
      <label htmlFor="FourthDigit"></label>
      <input
        type="text"
        placeholder="Fourth Digit"
        name="FourthDigit"
        id="FourthDigit"
        onChange={fourthHandleChange}
      />
      <button>Done</button>
    </form>
  );
}

function OrderModalItems({ goRideData, updateGoRideData }) {
  const filteredOrders = goRideData.filter((item) => item.status === 'pending')

  function removeSelectedCoordinates(index) {
    updateGoRideData(goRideData.filter((_, itemIndex) => itemIndex !== index))
  }

  return filteredOrders.map((item, index) => (
    <div
      className='grid grid-cols-1 cursor-pointer border border-[#eaeaea] rounded-md hover:border-[crimson] hover:text-[crimson] p-2 px-3 m-4'
      key={index}
      onClick={() => removeSelectedCoordinates(index)}
    >
      <div className='flex flex-col justify-start'>
        <div className='space-x-1'>
          <span className='font-semibold'>From:</span>
          <span>{item.pickUpPoint.address}</span>
        </div>
        <div className='font-semibold'>Destination:</div>
        <div className='space-x-1'>{item.destination.address}</div>
      </div>
      <div className='flex justify-end font-semibold space-x-1 mt-3'>
        <span>Rp. {item.price}</span>
      </div>
    </div>
  ))
}

export default OrderModalItems

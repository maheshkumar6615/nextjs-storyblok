const Card = ( params: any ) => {
  return(
    <div
    className="card"
    style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'black',
      textAlign: 'center',
    }}
  >
    <h3>{params.blok.title}</h3>
    <a
      href={params.blok.Link.url}
      className="card-button"
      style={{
        padding: '10px 20px',
        backgroundColor: '#0070f3',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '5px',
        marginTop: '20px',
      }}
    >
     Link
    </a>
  </div>
  )
};

export default Card;
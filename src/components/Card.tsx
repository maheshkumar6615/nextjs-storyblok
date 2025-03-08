import { storyblokEditable } from "@storyblok/react/rsc";

const Card = (params: any) => {
  return (
    <div
      className="card"
      style={{
        width: '100%',
        height: '200px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        color: 'black',
        textAlign: 'left',
        backgroundImage: `url(${params.blok.image.filename})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '20px',
        marginBottom: '3rem',
      }}
      {...storyblokEditable(params.blok)}
    >
      <h3 style={{ marginBottom: '10px', color: 'black' }}>{params.blok.title}</h3>
      <a
        href={params.blok.Link.url}
        className="card-button"
        style={{
          padding: '10px 20px',
          backgroundColor: '#0070f3',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px',
        }}
      >
        Link
      </a>
    </div>
  );
};

export default Card;
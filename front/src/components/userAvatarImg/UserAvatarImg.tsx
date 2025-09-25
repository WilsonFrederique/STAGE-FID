const UserAvatarImg = (props) => {
    return (
      <div className={`userImg ${props.lg ? 'lg' : ''}`}>
        <span className="rounded-circle">
          <img src={props.img} alt="User Avatar" className="img-fluid" />
        </span>
      </div>
    );
  };
  
  export default UserAvatarImg;
  
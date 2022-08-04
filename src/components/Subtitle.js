const Subtitle = (props) => {
  return (
    <p className="subtitle p-0 m-0">
      { props.revelation } { props.slug === "juz" ? "~" : "|"} { props.ayah }
    </p>
  )
}

export default Subtitle
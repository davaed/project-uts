function SectionRightComponent({ Component, pageProps, activeSession }) {
  return (
    <section className={`${activeSession ? 'col-span-3' : 'col-span-1'} h-full`}>
      <Component {...pageProps} />
    </section>
  )
}

export default SectionRightComponent

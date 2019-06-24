import React, { Component } from 'react'
import Helmet from 'react-helmet'

class TitleAndMetaTags extends Component {
  render() {
    return (
      <Helmet title={this.props.title}>
        {
          this.props.gtagId && <script async src={`https://www.googletagmanager.com/gtag/js?id=${this.props.gtagId}`} />
        }
        {
          this.props.gtagId &&
          <script>
            {`
              window.dataLayer = window.dataLayer || []
              function gtag(){dataLayer.push(arguments)}
              gtag('js', new Date())

              gtag('config', '${this.props.gtagId}')
            `}
          </script>
        }
        { this.props.canonicalUrl && <link rel="canonical" href={this.props.canonicalUrl}/> }
      </Helmet>
    )
  }
}

export default TitleAndMetaTags

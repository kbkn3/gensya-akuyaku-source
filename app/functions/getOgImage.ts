import { Resvg } from '@resvg/resvg-js'
import satori from 'satori'
import { SITE_TITLE } from '../constants'

const siteDomainName = 'gensya-akuyaku-source.pages.dev'
const fontFamily = 'Noto Sans JP'

export async function getOgImage(title: string, subTitle: string) {
  const fontNormal = await fetchFont(
    SITE_TITLE + siteDomainName,
    fontFamily,
    400,
  )
  const fontBold = await fetchFont(
    SITE_TITLE + title + subTitle,
    fontFamily,
    700,
  )

  const wakachi = [title, subTitle].flatMap(text => text.split(/(?<=\s)/))
  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100vw',
          padding: '2rem',
          backgroundColor: '#f3f4f6',
          boxSizing: 'border-box',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                flex: 1,
                alignSelf: 'stretch',
                background: 'white',
                borderRadius: '2rem',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                boxSizing: 'border-box',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      flex: 1,
                      color: '#222',
                      fontSize: '5.2rem',
                      paddingInline: '1rem',
                      boxSizing: 'border-box',
                      justifySelf: 'center',
                      display: 'flex',
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      fontFamily: 'Noto Sans JP',
                      fontWeight: 600,
                      fontFeatureSettings: 'palt',
                    },
                    children: wakachi.map(word => ({
                      type: 'span',
                      props: {
                        style: {
                          display: 'block',
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                        },
                        children: word,
                      },
                    })),
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      flexBasis: '20vh',
                      color: '#444',
                      fontSize: '2.8em',
                      boxSizing: 'border-box',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontFamily: 'Noto Sans JP',
                      fontWeight: 400,
                      fontFeatureSettings: 'palt',
                      overflowWrap: 'anywhere',
                      wordBreak: 'break-word',
                      lineBreak: 'strict',
                      textWrap: 'balance',
                    },
                    children: [SITE_TITLE].filter(Boolean),
                  },
                },
              ],
            },
          },
        ],
      },
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } as any,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'fontFamily',
          data: fontNormal,
          weight: 400,
          style: 'normal',
        },
        {
          name: 'fontFamily',
          data: fontBold,
          weight: 700,
          style: 'normal',
        },
      ],
    },
  )

  const resvg = new Resvg(svg)

  return resvg.render().asPng()
}

async function fetchFont(
  text: string,
  font: string,
  weight: number,
): Promise<ArrayBuffer> {
  const API = `https://fonts.googleapis.com/css2?family=${font}:wght@${weight}&text=${encodeURIComponent(text)}`

  const css = await (
    await fetch(API, {
      headers: {
        // Make sure it returns TTF.
        'User-Agent':
          'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1',
      },
    })
  ).text()

  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)

  if (!resource) {
    throw new Error('Failed to fetch font')
  }

  const res = await fetch(resource[1])

  return res.arrayBuffer()
}

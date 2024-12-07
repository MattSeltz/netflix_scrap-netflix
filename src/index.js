import { chromium } from "playwright";


const main = async () => {
  try {
    const browser = await chromium.launch({ headless: true })
    const context = await browser.newContext()
    const page = await context.newPage()

    await page.goto("https://www.netflix.com/tudum/top10/es")

    await page.waitForTimeout(1000)

    const movies = await page.evaluate(() => {
      const movies = document.querySelectorAll(".css-1rheyty tr")

      const moviesData = Array.from(movies).map(movie => {
        const title = movie.querySelector(".title button").textContent
        const rank = movie.querySelector(".rank").textContent
        const img = movie.querySelector("img.desktop-only").src
        const views = movie.querySelector(".views").textContent
        const length = movie.querySelectorAll(".desktop-only")[1].textContent

        return {title,rank,img,views,length}
      })

      return moviesData
    })

    await page.close()
    await context.close()
    await browser.close()

    console.log("DONE!")
  } catch (error) {
    console.error(error)
  }
}

await main()
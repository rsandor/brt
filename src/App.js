'use strict'

/**
 * Main BRT application class. Adds event listeners and provides an interface to
 * change the display.
 * @author Ryan Sandor Richards
 */
class App {
  /**
   * Creates and initializes the main application.
   */
  constructor () {
    this.timer = new Timer()
    this.timer.onRefresh(this.setDisplay.bind(this))
    this.display = {
      hours: document.getElementById('hours'),
      minutes: document.getElementById('minutes'),
      seconds: document.getElementById('seconds'),
      centiseconds: document.getElementById('centiseconds')
    }
    this.setDisplay(null, 0, 0, 0)
    this.addEvents(window)
  }

  /**
   * Binds user interface events for the application.
   */
  addEvents () {
    window.oncontextmenu = (e) => e.preventDefault()
    window.addEventListener('mousedown', (e) => {
      e.preventDefault()
      switch (e.button) {
        case 0: this.timer.toggle(); break
        case 2: this.timer.reset(); break
      }
    })

    const closeButton = document.getElementById('close')
    closeButton.addEventListener('mousedown', (e) => e.stopPropagation())
    closeButton.addEventListener('click', (e) => window.close())
  }

  /**
   * Sets the display for the given time.
   * @param {number} hours Hours for the display.
   * @param {number} minutes Minutes for the display.
   * @param {number} seconds Seconds for the display.
   * @param {number} centiseconds Milliseconds for the display.
   */
  setDisplay (hours, minutes, seconds, centiseconds) {
    if (hours) {
      this.display.hours.innerHTML = `${hours}`
    } else {
      this.display.hours.innerHTML = '0'
    }

    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    this.display.minutes.innerHTML = minutes

    if (seconds < 10) {
      seconds = `0${seconds}`
    }
    this.display.seconds.innerHTML = seconds

    if (centiseconds < 10) {
      centiseconds = `0${centiseconds}`
    }
    this.display.centiseconds.innerHTML = centiseconds
  }
}

window.App = App 

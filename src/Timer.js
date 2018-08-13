'use strict'

/**
 * Class for handling precise stopwatch timing.
 * @author Ryan Sandor Richards
 */
class Timer {
  /**
   * Creates a new timer.
   */
  constructor() {
    this.reset()
    this.pauseDuration = 0
  }

  /**
   * Registers a callback to execute when the timer has refreshed.
   * @param {function} cb Callback to execute on timing refresh.
   */
  onRefresh (cb) {
    this._refreshCb = cb
  }

  /**
   * Calculates the time delta between the timer's start time and now then executes
   * any refresh callbacks.
   */
  _refresh () {
    if (!this.running || !this._refreshCb) {
      return
    }
    let delta = new Date().getTime() - this.startTime
    const ms = delta % 1000
    const cs = Math.floor(ms / 10)
    delta = (delta - ms) / 1000
    const seconds = delta % 60
    delta = (delta - seconds) / 60
    const minutes = delta % 60
    const hours = (delta - minutes) / 60
    this._refreshCb(hours, minutes, seconds, cs)
  }

  /**
   * Stops and resets the timer.
   */
  reset () {
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer)
      this.refreshTimer = null
    }
    if (this._refreshCb) {
      this._refreshCb(null, 0, 0, 0)
    }
    this.running = false
  }

  /**
   * Toggles the timer between running and paused states.
   */
  toggle() {
    if (!this.refreshTimer) {
      this.startTime = new Date().getTime()
      this.running = true
      this.refreshTimer = setInterval(this._refresh.bind(this), 10)
    } else if (this.running) {
      this.pauseStart = new Date().getTime()
      this.running = false
    } else if (!this.running) {
      this.running = true
      const pauseDelta = new Date().getTime() - this.pauseStart
      this.startTime += pauseDelta
    }
  }
}

window.Timer = Timer

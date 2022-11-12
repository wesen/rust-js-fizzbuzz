#![no_std]
#![no_main]

use cortex_m_rt::entry;
extern crate panic_halt;

use nrf52833_hal as hal;
use hal::pac::Peripherals;
// use hal::Timer;
// use hal::gpio::p0;
//
// use nrf52833_hal::{spim};
// use nrf52833_hal::gpio::Level::Low;
// use nrf52833_hal::prelude::_embedded_hal_blocking_delay_DelayMs;
// use crate::spim::{Frequency, MODE_0};


#[entry]
fn main() -> ! {
    loop {}
}

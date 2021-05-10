import { Controller, Request, Response, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  @Get()
  root(@Response() res) {
    res.send('Sample web application server');
    return res.end();
  }

  // @UseGuards(AuthGuard('local'))
  // @Get('auth/login')
  // async login(@Request() req) {
  //   return req.user;
  // }
}
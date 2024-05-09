import { Controller, Post, Body, UseGuards, Patch, Param} from '@nestjs/common';
import { CreateReportDto } from './dtos/create.report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guards/auth.gard';
import { CurrentUser } from 'src/users/decorators/current.user.decorator';
import { User } from 'src/users/users.entity';
import { ReportDto } from './dtos/report.dto';
import { Serialize } from 'src/interceptors/serialized.interceptor';
import { ApproveReportDto } from './dtos/approve.report.dto';
import { AdminGuard } from 'src/guards/admin.guard';


@Controller('reports')
export class ReportsController {

    constructor(private reportService: ReportsService){}

    @Post()
    @UseGuards(AuthGuard)
    @Serialize(ReportDto)
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: User){
        this.reportService.create(body, user);
    }

    @Patch('/:id')
    @UseGuards(AdminGuard)
    approveReport(@Param('id') id: string, @Body() body: ApproveReportDto){
        return this.reportService.changeApproval(id, body.approved);
    }

}

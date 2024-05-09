import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reports } from './reports.entinty';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create.report.dto';
import { CurrentUser } from 'src/users/decorators/current.user.decorator';
import { User } from 'src/users/users.entity';

@Injectable()
export class ReportsService {

    constructor(@InjectRepository(Reports) private repo:Repository<Reports>){}
 
    create(reportDto: CreateReportDto, user: User){
        const report = this.repo.create(reportDto);
        report.user = user;
        return this.repo.save(report);
    }


    async changeApproval(id: string, approved: boolean) {
        const report = await this.repo.findOne({ where: { id: parseInt(id) } });
        if(!report){
            throw new NotFoundException('report not found');
        }
        report.approved = approved;
    }
}

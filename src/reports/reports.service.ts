import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reports } from './reports.entinty';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create.report.dto';

@Injectable()
export class ReportsService {

    constructor(@InjectRepository(Reports) private repo:Repository<Reports>){}
 
    create(reportDto: CreateReportDto){
        const report = this.repo.create(reportDto);
        return this.repo.save(report);
    }
}
